(function () {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
      return;
    }
    fn();
  }

  function createNode(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  ready(function () {
    const shell = createNode('section', 'mc-chat-shell');
    shell.setAttribute('aria-hidden', 'true');

    const launcher = createNode('button', 'mc-chat-launcher', 'Assistant Monocle');
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Ouvrir le chat Monocle');

    const head = createNode('div', 'mc-chat-head');
    const headText = createNode('div');
    headText.appendChild(createNode('strong', '', 'Assistant Monocle'));
    headText.appendChild(createNode('p', '', 'Posez une question sur les montures, le sur-mesure, les horaires ou la boutique.'));
    const closeButton = createNode('button', 'mc-chat-close', '×');
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Fermer le chat');
    head.appendChild(headText);
    head.appendChild(closeButton);

    const messages = createNode('div', 'mc-chat-messages');
    const suggestions = createNode('div', 'mc-chat-suggestions');

    const form = createNode('form', 'mc-chat-form');
    const textarea = createNode('textarea');
    textarea.name = 'message';
    textarea.placeholder = 'Ex: Je cherche une monture noire pour homme';
    const submit = createNode('button', '', 'Envoyer');
    submit.type = 'submit';
    const foot = createNode('p', 'mc-chat-foot', 'Assistant conversationnel Monocle. Pour un conseil final, un ajustage ou une confirmation produit, la boutique reste la meilleure reference.');
    form.appendChild(textarea);
    form.appendChild(submit);
    form.appendChild(foot);

    shell.appendChild(head);
    shell.appendChild(messages);
    shell.appendChild(suggestions);
    shell.appendChild(form);
    document.body.appendChild(shell);
    document.body.appendChild(launcher);

    const history = [];
    let loading = false;

    const defaultSuggestions = [
      'Quels sont vos horaires ?',
      'Je cherche une monture femme',
      'Explique-moi le sur-mesure',
      'Ou est la boutique ?'
    ];

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    function addMessage(role, content, ctas) {
      history.push({ role: role, content: content });
      const row = createNode('div', `mc-chat-row is-${role}`);
      const bubble = createNode('div', 'mc-chat-bubble', content);
      if (role === 'assistant' && Array.isArray(ctas) && ctas.length) {
        const linksWrap = createNode('div', 'mc-chat-links');
        ctas.slice(0, 3).forEach(function (item) {
          if (!item || !item.url) return;
          const link = createNode('a', 'mc-chat-link', item.label || 'Ouvrir');
          link.href = item.url;
          if (/^https?:\/\//i.test(item.url)) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
          }
          linksWrap.appendChild(link);
        });
        if (linksWrap.childNodes.length) bubble.appendChild(linksWrap);
      }
      row.appendChild(bubble);
      messages.appendChild(row);
      scrollToBottom();
    }

    function setSuggestions(items) {
      const values = (Array.isArray(items) && items.length ? items : defaultSuggestions).slice(0, 4);
      suggestions.innerHTML = '';
      values.forEach(function (item) {
        const chip = createNode('button', 'mc-chat-chip', item);
        chip.type = 'button';
        chip.addEventListener('click', function () {
          textarea.value = item;
          submitMessage(item);
        });
        suggestions.appendChild(chip);
      });
    }

    function setOpen(next) {
      shell.classList.toggle('is-open', next);
      shell.setAttribute('aria-hidden', next ? 'false' : 'true');
      if (next) {
        textarea.focus();
        scrollToBottom();
      }
    }

    async function submitMessage(text) {
      const message = String(text || textarea.value || '').trim();
      if (!message || loading) return;
      loading = true;
      textarea.value = '';
      const requestHistory = history.slice(-8);
      addMessage('user', message);
      addMessage('assistant', 'Je regarde cela pour vous...');
      const placeholder = messages.lastElementChild;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            message: message,
            history: requestHistory
          })
        });

        const payload = await res.json().catch(function () { return {}; });
        if (!res.ok) throw new Error(payload.error || 'chat_failed');

        history.pop();
        if (placeholder) placeholder.remove();
        addMessage('assistant', payload.answer || "Je n'ai pas pu formuler une reponse pour le moment.", payload.ctas);
        setSuggestions(payload.suggestions);
      } catch (_error) {
        history.pop();
        if (placeholder) placeholder.remove();
        addMessage('assistant', "Je ne peux pas repondre completement pour le moment, mais je peux deja vous orienter vers le catalogue, le sur-mesure, ou la prise de rendez-vous.");
        setSuggestions(defaultSuggestions);
      } finally {
        loading = false;
      }
    }

    launcher.addEventListener('click', function () {
      setOpen(!shell.classList.contains('is-open'));
    });

    closeButton.addEventListener('click', function () {
      setOpen(false);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      submitMessage();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });

    addMessage('assistant', 'Bonjour, je suis l assistant Monocle. Je peux vous guider sur les montures, le sur-mesure, les horaires, la boutique ou la prise de rendez-vous.');
    setSuggestions(defaultSuggestions);
  });
})();
