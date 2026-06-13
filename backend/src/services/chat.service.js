const CHAT_CONTENT_KEYS = [
  'site-settings',
  'site-nav',
  'home-hero',
  'home-contact',
  'home-quote',
  'home-atelier',
  'home-process',
  'home-stores',
  'collection-meta',
  'collection-hero',
  'collection-trust',
  'collection-footer',
  'collections-meta',
  'collections-hero',
  'collections-footer',
  'surmesure-meta',
  'surmesure-hero',
  'surmesure-offer',
  'surmesure-story',
  'surmesure-final'
];

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(/[^a-z0-9]+/g)
    .filter((item) => item.length > 1);
}

function truncate(value, limit) {
  const text = String(value || '').trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1).trim()}...`;
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function contentSummary(row) {
  if (!row) return '';
  const parts = [
    row.key,
    row.title,
    row.body,
    ...Object.entries(row.data || {}).map(([key, value]) => `${key}: ${value}`)
  ].filter(Boolean);
  return parts.join(' | ');
}

function productSummary(row) {
  if (!row) return '';
  return [
    row.title,
    row.category,
    row.genre,
    row.couleur,
    row.forme,
    row.matiere,
    safeArray(row.extra).join(', '),
    `prix ${row.price} ${row.currency || 'DH'}`,
    `stock ${row.stock}`
  ].filter(Boolean).join(' | ');
}

function scoreByTokens(queryTokens, haystack) {
  const text = normalizeText(haystack);
  return queryTokens.reduce((sum, token) => sum + (text.includes(token) ? 1 : 0), 0);
}

function pickTopMatches(items, query, summaryFn, limit) {
  const tokens = tokenize(query);
  const scored = items
    .map((item) => ({
      item,
      score: scoreByTokens(tokens, summaryFn(item))
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((entry) => entry.item);
}

function formatContentForPrompt(items) {
  return items.map((row) => {
    return `- ${row.key}: ${truncate(row.title, 120)} | ${truncate(row.body, 180)} | ${truncate(JSON.stringify(row.data || {}), 220)}`;
  }).join('\n');
}

function formatProductsForPrompt(items) {
  return items.map((row) => {
    const extras = safeArray(row.extra).join(', ');
    return `- ${row.title}: ${row.category || 'Catalogue'} | ${row.genre} | ${row.couleur} | ${row.forme} | ${row.matiere} | ${extras || 'sans extra'} | prix ${Number(row.price || 0).toFixed(2)} ${row.currency || 'DH'} | stock ${row.stock}`;
  }).join('\n');
}

function absoluteSiteUrl(pathname) {
  const path = String(pathname || '').trim() || '/';
  if (/^https?:\/\//i.test(path)) return path;
  return path.startsWith('/') ? path : `/${path.replace(/^\.\//, '')}`;
}

function buildLinkMap(contentMap) {
  const siteSettings = contentMap['site-settings'];
  const homeHero = contentMap['home-hero'];
  const collectionHero = contentMap['collection-hero'];
  const collectionsHero = contentMap['collections-hero'];
  const surMeasureHero = contentMap['surmesure-hero'];
  const surMeasureFinal = contentMap['surmesure-final'];

  return {
    home: { label: 'Accueil', url: '/index.html' },
    catalogue: {
      label: (collectionHero && collectionHero.title) || 'Voir le catalogue',
      url: absoluteSiteUrl((homeHero && homeHero.data && homeHero.data.cta_primary_url) || '/collection.html')
    },
    collections: {
      label: (collectionsHero && collectionsHero.data && collectionsHero.data.cta_primary_label) || 'Voir les collections',
      url: absoluteSiteUrl((collectionsHero && collectionsHero.data && collectionsHero.data.cta_primary_url) || '/collections.html')
    },
    surmesure: {
      label: (surMeasureHero && surMeasureHero.data && surMeasureHero.data.cta_label) || 'Decouvrir le sur-mesure',
      url: absoluteSiteUrl((surMeasureHero && surMeasureHero.data && surMeasureHero.data.cta_href) || '/sur-mesure.html')
    },
    rendezvous: {
      label: (surMeasureFinal && surMeasureFinal.data && surMeasureFinal.data.cta_label) || 'Prendre rendez-vous',
      url: absoluteSiteUrl((surMeasureFinal && surMeasureFinal.data && surMeasureFinal.data.cta_href) || '/collection.html')
    },
    contact: {
      label: 'Appeler la boutique',
      url: (siteSettings && siteSettings.data && siteSettings.data.phone_href) || 'tel:+212661290703'
    },
    itineraire: {
      label: 'Voir l itineraire',
      url: (siteSettings && siteSettings.data && siteSettings.data.maps_url) || ''
    }
  };
}

function repeatedQuestion(history, message) {
  const normalized = normalizeText(message);
  if (!normalized) return false;
  const items = safeArray(history)
    .filter((item) => item && (item.role === 'user' || item.role === 'assistant'))
    .map((item) => ({
      role: item.role,
      content: normalizeText(item.content)
    }))
    .filter((item) => item.content);

  for (let index = items.length - 1; index >= 0; index -= 1) {
    const item = items[index];
    if (item.role !== 'user' || item.content !== normalized) continue;

    const hasAssistantReplyAfter = items.slice(index + 1).some((entry) => entry.role === 'assistant');
    if (hasAssistantReplyAfter) return true;
  }

  return false;
}

function matchAttribute(query, values) {
  return values.find((value) => query.includes(value)) || '';
}

function buildProductReply(products, links, options) {
  const list = safeArray(products).slice(0, 3);
  const intro = options && options.intro ? `${options.intro} ` : '';
  const summary = list.map((item) => {
    const price = Number(item.price || 0).toFixed(2);
    return `${item.title} (${item.couleur || 'couleur non precise'}, ${item.forme || 'forme non precise'}, ${price} ${item.currency || 'DH'})`;
  }).join('; ');

  return {
    answer: `${intro}Je peux deja vous proposer cette selection Monocle : ${summary}. Si vous le souhaitez, je peux affiner encore selon la couleur, la forme, la matiere ou votre budget.`,
    suggestions: options && options.suggestions ? options.suggestions : ['Je veux une monture noire', 'Je prefere une forme ronde', 'Mon budget est de 1500 DH'],
    ctas: [links.catalogue, links.rendezvous, links.contact].filter(Boolean)
  };
}

function extractResponseText(payload) {
  if (payload && typeof payload.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const output = Array.isArray(payload && payload.output) ? payload.output : [];
  for (const item of output) {
    const content = Array.isArray(item && item.content) ? item.content : [];
    const textPart = content.find((part) => typeof part.text === 'string' && part.text.trim());
    if (textPart) return textPart.text.trim();
  }

  return '';
}

function buildFallbackReply(message, history, context) {
  const query = normalizeText(message);
  const links = context.links;
  const settings = context.contentMap['site-settings'];
  const phone = settings && settings.data && settings.data.phone_display;
  const addressLine = settings && settings.data && settings.data.address_line;
  const city = settings && settings.data && settings.data.address_city;
  const hours = settings && settings.data && settings.data.opening_hours_full;
  const maps = settings && settings.data && settings.data.maps_url;

  if (repeatedQuestion(history, message)) {
    return {
      answer: "Vous avez repose la meme question. Je peux bien sur vous la reformuler plus clairement, vous redonner le bon lien Monocle, ou vous orienter directement vers un rendez-vous en boutique.",
      suggestions: ['Redonne-moi le bon lien', 'Reformule ta reponse', 'Prendre rendez-vous'],
      ctas: [links.catalogue, links.surmesure, links.rendezvous].filter(Boolean)
    };
  }

  if (/horaire|heure|ouvert|ferme/.test(query)) {
    return {
      answer: `Voici les horaires actuellement renseignes pour Monocle : ${hours || 'Lundi a vendredi 10:00-20:30, samedi 10:00-19:00, dimanche ferme.'} Si vous le souhaitez, je peux aussi vous guider vers la boutique ou la prise de rendez-vous.`,
      suggestions: ['Ou se trouve la boutique ?', 'Comment prendre rendez-vous ?', 'Je cherche une monture homme'],
      ctas: [links.contact, links.itineraire, links.rendezvous].filter((item) => item && item.url)
    };
  }

  if (/adresse|ou se trouve|ou est|itineraire|kenitra|sale/.test(query)) {
    return {
      answer: `La boutique Monocle se trouve ${addressLine || 'residence lotus, mag ndeg2 Rue Baghdad'}, ${city || 'Kenitra'}. ${maps ? `Je peux aussi vous orienter vers le lien d'itineraire directement.` : ''}`,
      suggestions: ['Quels sont les horaires ?', 'Puis-je appeler la boutique ?', 'Comment prendre rendez-vous ?'],
      ctas: [links.itineraire, links.contact, links.rendezvous].filter((item) => item && item.url)
    };
  }

  if (/telephone|appeler|numero|contact/.test(query)) {
    return {
      answer: `Vous pouvez joindre Monocle au ${phone || '06 61 29 07 03'}. Si vous preferez, je peux aussi vous orienter vers la prise de rendez-vous ou vers une selection de montures adaptee a votre recherche.`,
      suggestions: ['Comment prendre rendez-vous ?', 'Je cherche une monture noire', 'Explique-moi le sur-mesure'],
      ctas: [links.contact, links.rendezvous, links.catalogue].filter(Boolean)
    };
  }

  if (/rendez|rdv|reservation|reserver/.test(query)) {
    return {
      answer: "Vous pouvez prendre rendez-vous directement depuis le catalogue ou la page sur-mesure. Si vous m'indiquez votre besoin, je peux vous orienter plus precisement vers une recherche de monture, un accompagnement solaire ou une demande sur-mesure.",
      suggestions: ['Je veux une monture solaire', 'Explique-moi le sur-mesure', 'Je cherche une monture femme'],
      ctas: [links.rendezvous, links.catalogue, links.surmesure].filter(Boolean)
    };
  }

  if (/sur mesure|sur-mesure|mesure|personnalis/.test(query)) {
    return {
      answer: "Le sur-mesure Monocle est pense comme un accompagnement plus personnel, de l'etude de la morphologie jusqu'aux finitions. L'objectif est d'obtenir une monture plus juste en confort, en proportions et en style, avec une experience boutique plus exclusive.",
      suggestions: ['Comment prendre rendez-vous ?', 'Quelle difference avec la collection ?', 'Ou est la boutique ?'],
      ctas: [links.surmesure, links.rendezvous, links.catalogue].filter(Boolean)
    };
  }

  if (/lunette|monture|solaire|homme|femme|ronde|carree|pilote|noir|ecaille|metal|acetate/.test(query)) {
    const requestedGenre = matchAttribute(query, ['femme', 'homme', 'unisexe']);
    const requestedColor = matchAttribute(query, ['noir', 'ecaille', 'dore', 'argente', 'marron', 'transparent', 'gris']);
    const requestedShape = matchAttribute(query, ['ronde', 'carree', 'pilote', 'ovale', 'pantos', 'rectangulaire']);
    const refinedProducts = context.products.filter((item) => {
      const haystack = normalizeText(productSummary(item));
      if (requestedGenre && !haystack.includes(requestedGenre)) return false;
      if (requestedColor && !haystack.includes(requestedColor)) return false;
      if (requestedShape && !haystack.includes(requestedShape)) return false;
      return true;
    });
    const products = refinedProducts.length ? refinedProducts : (context.productMatches.length ? context.productMatches : context.products.slice(0, 3));

    if (products.length) {
      if (requestedGenre || requestedColor || requestedShape) {
        const fragments = [requestedGenre && `pour ${requestedGenre}`, requestedColor && `en ${requestedColor}`, requestedShape && `forme ${requestedShape}`].filter(Boolean);
        return buildProductReply(products, links, {
          intro: `J'ai prepare une selection ${fragments.join(' ')} qui me semble pertinente.`,
          suggestions: ['Montre-moi plus de modeles', 'Je veux une autre couleur', 'Je veux prendre rendez-vous']
        });
      }

      return {
        answer: "Je peux vous aider a trouver une monture plus proche de votre style. Dites-moi simplement si vous cherchez une monture femme ou homme, une couleur comme noir ou ecaille, ou une forme comme ronde ou carree, et je vous ferai une proposition plus ciblee.",
        suggestions: ['Je cherche une monture femme', 'Je veux une monture noire', 'Je prefere une forme ronde'],
        ctas: [links.catalogue, links.rendezvous, links.contact].filter(Boolean)
      };
    }
  }

  return {
    answer: "Je peux vous renseigner sur les horaires, la boutique, la prise de rendez-vous, le sur-mesure, ou vous aider a choisir une monture du catalogue Monocle. Dites-moi simplement ce que vous recherchez et je vous guide.",
    suggestions: ['Quels sont les horaires ?', 'Je cherche une monture femme', 'Explique-moi le sur-mesure'],
    ctas: [links.catalogue, links.surmesure, links.contact].filter(Boolean)
  };
}

function historyToInput(history) {
  return safeArray(history)
    .filter((item) => item && (item.role === 'user' || item.role === 'assistant') && String(item.content || '').trim())
    .slice(-8)
    .map((item) => ({
      role: item.role,
      content: [{ type: 'input_text', text: String(item.content).trim() }]
    }));
}

function systemPrompt(context) {
  return [
    'Tu es Assistant Monocle, un conseiller client premium pour une boutique d optique au Maroc.',
    'Ton domaine est STRICTEMENT limite a : les lunettes (optique, solaire), le sur-mesure Monocle, les montures du catalogue, le choix de monture selon le visage, la marque Monocle, la boutique (horaires, adresse, contact), la prise de rendez-vous, les promotions en cours.',
    '',
    'REGLES STRICTES :',
    '1. Tu ne reponds qu en francais.',
    '2. Tu n utilises QUE les informations du contexte Monocle ci-dessous. Tu n inventes jamais un prix, un stock, une adresse, un horaire, une promesse, un nom de modele ou une caracteristique technique.',
    '3. Si une information manque dans le contexte, dis-le simplement et invite a contacter la boutique ou prendre rendez-vous.',
    '4. Tu peux recommander des montures quand elles apparaissent dans le contexte produits.',
    '5. Tu refuses POLIMENT tout sujet hors du domaine : politique, religion, actualites, code informatique, math, jeux, blagues, conseils medicaux precis (ordonnance, diagnostic), autres marques ou autres boutiques. Reponds par exemple : "Je suis l assistant Monocle, je vous accompagne uniquement sur l univers des lunettes et le sur-mesure. Comment puis-je vous aider sur ce sujet ?"',
    '6. Pas de blagues, pas d emojis, pas de markdown lourd. Ton premium, sobre, chaleureux.',
    '7. Pas de promesses commerciales que la boutique n a pas validees (pas de remises, pas de delais, pas de garanties inventees).',
    '8. Si la question concerne un probleme de vue serieux (douleur, perte de vision, urgence), invite a consulter un ophtalmologiste sans donner de diagnostic.',
    '9. Reponses courtes et utiles : 3 a 6 phrases maximum, sauf si le client demande explicitement plus de detail. Termine si c est pertinent par une suggestion d action concrete (essayer en ligne, prendre rendez-vous, appeler la boutique).',
    '',
    'Contexte contenus Monocle :',
    context.promptContent || '- aucun contenu pertinent trouve',
    '',
    'Contexte produits Monocle :',
    context.promptProducts || '- aucun produit pertinent trouve'
  ].join('\n');
}

async function callOllamaChat(context, message, history, env) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), env.ollamaTimeoutMs || 30000);
  try {
    const messages = [
      { role: 'system', content: systemPrompt(context) },
      ...safeArray(history)
        .filter((item) => item && item.content)
        .slice(-6)
        .map((item) => ({
          role: item.role === 'assistant' ? 'assistant' : 'user',
          content: String(item.content || '').trim()
        })),
      { role: 'user', content: String(message || '').trim() }
    ];

    const res = await fetch(`${env.ollamaBaseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: env.ollamaModel,
        messages,
        stream: false,
        options: { temperature: 0.4, num_predict: 400 }
      }),
      signal: controller.signal
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`ollama_chat_failed:${res.status}:${body.slice(0, 180)}`);
    }

    const payload = await res.json();
    const answer = String((payload && payload.message && payload.message.content) || '').trim();
    if (!answer) throw new Error('ollama_chat_empty');
    return answer;
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenAIChat(context, message, history, env) {
  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.openaiApiKey}`
    },
    body: JSON.stringify({
      model: env.openaiChatModel,
      input: [
        ...historyToInput(history),
        {
          role: 'user',
          content: [{ type: 'input_text', text: String(message || '').trim() }]
        }
      ],
      instructions: systemPrompt(context)
    })
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`openai_chat_failed:${res.status}:${body.slice(0, 180)}`);
  }

  const payload = await res.json();
  const answer = extractResponseText(payload);
  if (!answer) throw new Error('openai_chat_empty');
  return answer;
}

function buildChatService({ cmsService, env }) {
  async function buildContext(message) {
    const [contentMap, products] = await Promise.all([
      cmsService.getContentMany ? cmsService.getContentMany(CHAT_CONTENT_KEYS) : Promise.resolve({}),
      cmsService.listProducts()
    ]);

    const activeProducts = safeArray(products).filter((item) => item && item.active !== false);
    const contentRows = Object.values(contentMap || {});
    const matchedProducts = pickTopMatches(activeProducts, message, productSummary, 5);
    const matchedContent = pickTopMatches(contentRows, message, contentSummary, 6);

    return {
      contentMap,
      products: activeProducts,
      productMatches: matchedProducts,
      contentMatches: matchedContent,
      links: buildLinkMap(contentMap),
      promptContent: formatContentForPrompt(matchedContent),
      promptProducts: formatProductsForPrompt(matchedProducts.length ? matchedProducts : activeProducts.slice(0, 4))
    };
  }

  async function reply({ message, history }) {
    const trimmed = String(message || '').trim();
    if (!trimmed) {
      return {
        ok: false,
        code: 400,
        error: 'missing_message'
      };
    }

    const context = await buildContext(trimmed);
    const fallbackMeta = buildFallbackReply(trimmed, history, context);

    async function tryProvider(name, callFn) {
      try {
        const answer = await callFn(context, trimmed, history, env);
        return {
          ok: true,
          code: 200,
          data: {
            answer,
            mode: name,
            suggestions: fallbackMeta.suggestions,
            ctas: fallbackMeta.ctas
          }
        };
      } catch (error) {
        console.warn(`[chat] ${name} failed:`, error && error.message ? error.message.slice(0, 200) : 'unknown');
        return null;
      }
    }

    if (env.ollamaBaseUrl) {
      const result = await tryProvider('ollama', callOllamaChat);
      if (result) return result;
    }

    if (env.openaiApiKey) {
      const result = await tryProvider('ai', callOpenAIChat);
      if (result) return result;
    }

    return {
      ok: true,
      code: 200,
      data: {
        answer: fallbackMeta.answer,
        mode: 'fallback',
        suggestions: fallbackMeta.suggestions,
        ctas: fallbackMeta.ctas
      }
    };
  }

  return {
    reply
  };
}

module.exports = { buildChatService };
