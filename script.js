const fallbackProducts = [
  {
    id: 1,
    name: "Style Creamy",
    genre: "Femme",
    couleur: "Ecaille",
    forme: "Papillon",
    matiere: "Acetate",
    extra: ["Oversize"],
    colors: 3,
    stock: 5,
    price: 190,
    nouveaute: true,
    image: "./modele_pk9_1_jylsc_pour_maison_bonnet.jpg"
  },
  {
    id: 2,
    name: "Jet Line",
    genre: "Homme",
    couleur: "Noir",
    forme: "Pilote",
    matiere: "Metal",
    extra: ["Polarisant"],
    colors: 2,
    stock: 4,
    price: 190,
    nouveaute: true,
    image: "./h_01-ray-2-1-768x512.jpg"
  },
  {
    id: 3,
    name: "Santa Rosa",
    genre: "Unisexe",
    couleur: "Or",
    forme: "Ronde",
    matiere: "Combine",
    extra: ["Polarisant"],
    colors: 3,
    stock: 6,
    price: 170,
    nouveaute: true,
    image: "./h_01-auguste-2-768x512.jpg"
  },
  {
    id: 4,
    name: "Road Texas",
    genre: "Homme",
    couleur: "Vert",
    forme: "Carree",
    matiere: "Acetate",
    extra: [],
    colors: 4,
    stock: 2,
    price: 150,
    nouveaute: true,
    image: "./h_01-longuemare-4-768x512.jpg"
  },
  {
    id: 5,
    name: "Liquid Velvet",
    genre: "Femme",
    couleur: "Noir",
    forme: "Papillon",
    matiere: "Metal",
    extra: ["Polarisant"],
    colors: 2,
    stock: 3,
    price: 210,
    nouveaute: false,
    image: "./f_01-sully-1-768x512.jpg"
  },
  {
    id: 6,
    name: "Iconik Layer",
    genre: "Unisexe",
    couleur: "Ecaille",
    forme: "Ronde",
    matiere: "Combine",
    extra: ["Oversize"],
    colors: 4,
    stock: 7,
    price: 175,
    nouveaute: false,
    image: "./f_01-clifford-1-768x512.jpg"
  },
  {
    id: 7,
    name: "Sparkle Siena",
    genre: "Femme",
    couleur: "Or",
    forme: "Carree",
    matiere: "Metal",
    extra: [],
    colors: 4,
    stock: 0,
    price: 130,
    nouveaute: true,
    image: "./f_01-seven-1-1-768x512.jpg"
  },
  {
    id: 8,
    name: "Dual Link",
    genre: "Homme",
    couleur: "Noir",
    forme: "Pilote",
    matiere: "Metal",
    extra: ["Polarisant"],
    colors: 3,
    stock: 8,
    price: 150,
    nouveaute: false,
    image: "./01-cordier-1-768x512.jpg"
  },
  {
    id: 9,
    name: "Amalfi Curve",
    genre: "Unisexe",
    couleur: "Vert",
    forme: "Ronde",
    matiere: "Acetate",
    extra: [],
    colors: 2,
    stock: 1,
    price: 145,
    nouveaute: true,
    image: "./f_01-tom-15-768x512.jpg"
  },
  {
    id: 10,
    name: "Legendre Atelier",
    genre: "Homme",
    couleur: "Noir",
    forme: "Carree",
    matiere: "Combine",
    extra: ["Polarisant"],
    colors: 3,
    stock: 5,
    price: 220,
    nouveaute: true,
    image: "./h_01-legendre-1-1-768x512.jpg"
  },
  {
    id: 11,
    name: "Sully Lumiere",
    genre: "Femme",
    couleur: "Ecaille",
    forme: "Papillon",
    matiere: "Acetate",
    extra: ["Oversize"],
    colors: 4,
    stock: 3,
    price: 185,
    nouveaute: false,
    image: "./f_01-sully-1-768x512.jpg"
  },
  {
    id: 12,
    name: "Ray Heritage",
    genre: "Unisexe",
    couleur: "Vert",
    forme: "Pilote",
    matiere: "Metal",
    extra: ["Polarisant"],
    colors: 2,
    stock: 6,
    price: 210,
    nouveaute: false,
    image: "./h_01-ray-2-1-768x512.jpg"
  },
  {
    id: 13,
    name: "Auguste Prime",
    genre: "Homme",
    couleur: "Or",
    forme: "Ronde",
    matiere: "Metal",
    extra: [],
    colors: 3,
    stock: 4,
    price: 175,
    nouveaute: true,
    image: "./h_01-auguste-2-768x512.jpg"
  },
  {
    id: 14,
    name: "Clifford Studio",
    genre: "Femme",
    couleur: "Noir",
    forme: "Carree",
    matiere: "Acetate",
    extra: [],
    colors: 3,
    stock: 2,
    price: 168,
    nouveaute: false,
    image: "./f_01-clifford-1-768x512.jpg"
  },
  {
    id: 15,
    name: "Cordier Signature",
    genre: "Unisexe",
    couleur: "Ecaille",
    forme: "Ronde",
    matiere: "Combine",
    extra: ["Oversize"],
    colors: 4,
    stock: 5,
    price: 198,
    nouveaute: true,
    image: "./01-cordier-1-768x512.jpg"
  },
  {
    id: 16,
    name: "Terry Optimise",
    genre: "Homme",
    couleur: "Vert",
    forme: "Pilote",
    matiere: "Metal",
    extra: ["Polarisant"],
    colors: 2,
    stock: 1,
    price: 230,
    nouveaute: true,
    image: "./richard_modele-terry-optimised.jpg"
  },
  {
    id: 17,
    name: "Seven Contour",
    genre: "Femme",
    couleur: "Or",
    forme: "Papillon",
    matiere: "Combine",
    extra: ["Oversize"],
    colors: 3,
    stock: 4,
    price: 179,
    nouveaute: false,
    image: "./f_01-seven-1-1-768x512.jpg"
  },
  {
    id: 18,
    name: "Tom Edition",
    genre: "Unisexe",
    couleur: "Noir",
    forme: "Carree",
    matiere: "Acetate",
    extra: ["Polarisant"],
    colors: 2,
    stock: 0,
    price: 188,
    nouveaute: true,
    image: "./f_01-tom-15-768x512.jpg"
  }
];

let products = fallbackProducts.slice();

const grid = document.getElementById("grid");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");
const countNode = document.getElementById("count");
const activeFiltersNode = document.getElementById("activeFilters");
const loadMoreButton = document.getElementById("loadMore");
const resetButton = document.getElementById("resetFilters");
const openFiltersButton = document.getElementById("openFilters");
const closeFiltersButton = document.getElementById("closeFilters");
const filtersOverlay = document.getElementById("filtersOverlay");
const applyFiltersButton = document.getElementById("applyFilters");
const clearFiltersMobileButton = document.getElementById("clearFiltersMobile");
const quickViewModal = document.getElementById("quickViewModal");
const qvClose = document.getElementById("qvClose");
const qvImage = document.getElementById("qvImage");
const qvBadge = document.getElementById("qvBadge");
const qvTitle = document.getElementById("qvTitle");
const qvMeta = document.getElementById("qvMeta");
const qvStock = document.getElementById("qvStock");
const qvPrice = document.getElementById("qvPrice");
const qvColors = document.getElementById("qvColors");
const qvSizes = document.getElementById("qvSizes");
const qvQtyMinus = document.getElementById("qvQtyMinus");
const qvQtyPlus = document.getElementById("qvQtyPlus");
const qvQtyValue = document.getElementById("qvQtyValue");
const qvAddToCart = document.getElementById("qvAddToCart");
const qvMessage = document.getElementById("qvMessage");
const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const cartItemsNode = document.getElementById("cartItems");
const cartSubtotalNode = document.getElementById("cartSubtotal");
const cartCountNode = document.getElementById("cartCount");
const checkoutButton = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutButton = document.getElementById("closeCheckout");
const checkoutPrevButton = document.getElementById("checkoutPrev");
const checkoutNextButton = document.getElementById("checkoutNext");
const checkoutErrorNode = document.getElementById("checkoutError");
const confirmationSummaryNode = document.getElementById("confirmationSummary");
const checkoutSteps = [1, 2, 3, 4].map((idx) => ({
  section: document.getElementById(`step${idx}`),
  label: document.getElementById(`stepLabel${idx}`)
}));
const checkoutForm = {
  name: document.getElementById("coName"),
  email: document.getElementById("coEmail"),
  phone: document.getElementById("coPhone"),
  address: document.getElementById("coAddress"),
  city: document.getElementById("coCity"),
  zip: document.getElementById("coZip"),
  country: document.getElementById("coCountry"),
  cardName: document.getElementById("coCardName"),
  cardNumber: document.getElementById("coCardNumber"),
  cardExpiry: document.getElementById("coCardExpiry"),
  cardCvc: document.getElementById("coCardCvc")
};
const filterInputs = [...document.querySelectorAll('.filters input[type="checkbox"]')];
const mobileQuery = window.matchMedia("(max-width: 860px)");
const PAGE_SIZE = 8;
let visibleCount = PAGE_SIZE;
const CART_STORAGE_KEY = "monocle_cart_v1";
let cart = [];
let checkoutStep = 1;
const quickViewState = {
  productId: null,
  color: null,
  size: null,
  qty: 1
};

const colorVariants = {
  Noir: ["Noir", "Graphite", "Fume"],
  Ecaille: ["Ecaille", "Miel", "Tabac"],
  Or: ["Satin Gold", "Champagne", "Bronze"],
  Vert: ["Vert Pin", "Olive", "Sauge"]
};

const sizesByForme = {
  Pilote: ["M", "L"],
  Ronde: ["S", "M"],
  Carree: ["M", "L"],
  Papillon: ["S", "M", "L"]
};

const SEARCH_ALIASES = {
  rayban: "ray",
  "ray-ban": "ray"
};

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getSearchValue() {
  return normalizeSearchText(searchInput ? searchInput.value : "");
}

function pickFirst(value, fallback) {
  return value === undefined || value === null || value === "" ? fallback : value;
}

function inferFromText(text, values, fallback) {
  const haystack = String(text || "").toLowerCase();
  const found = values.find((item) => haystack.includes(String(item).toLowerCase()));
  return found || fallback;
}

function mapCmsProduct(row, index) {
  if (!row || row.active === false) return null;

  const gallery = Array.isArray(row.gallery) ? row.gallery : [];
  const rawText = [row.category, row.description, row.title].join(" ");
  const genre = String(row.genre || inferFromText(rawText, ["Femme", "Homme", "Unisexe"], "Unisexe"));
  const couleur = String(row.couleur || inferFromText(rawText, ["Noir", "Ecaille", "Or", "Vert"], "Noir"));
  const forme = String(row.forme || inferFromText(rawText, ["Pilote", "Ronde", "Carree", "Papillon"], "Ronde"));
  const matiere = String(row.matiere || inferFromText(rawText, ["Acetate", "Metal", "Combine"], "Acetate"));
  const extraList = Array.isArray(row.extra) ? row.extra.map((item) => String(item)) : [];
  const isPolar = extraList.length ? extraList.includes("Polarisant") : /polar|polaris/i.test(rawText);
  const isOversize = extraList.length ? extraList.includes("Oversize") : /oversize/i.test(rawText);
  const image = pickFirst(row.image_url, gallery[0] || "./modele_pk9_1_jylsc_pour_maison_bonnet.jpg");
  const colors = Math.max(2, Math.min(6, gallery.length + 1));

  return {
    id: Number(pickFirst(row.id, index + 1)),
    name: String(pickFirst(row.title, `Modele ${index + 1}`)),
    category: String(row.category || "Solaire"),
    genre,
    couleur,
    forme,
    matiere,
    extra: extraList.length ? extraList : [isPolar ? "Polarisant" : "", isOversize ? "Oversize" : ""].filter(Boolean),
    colors,
    stock: Math.max(0, Number(pickFirst(row.stock, 0)) || 0),
    price: Number(pickFirst(row.price, 0)) || 0,
    nouveaute: !!row.active,
    image
  };
}

async function loadProductsFromApi() {
  try {
    const res = await fetch("/api/products", { headers: { Accept: "application/json" } });
    if (!res.ok) return;
    const payload = await res.json();
    const rows = Array.isArray(payload.rows) ? payload.rows : [];
    const mapped = rows.map(mapCmsProduct).filter(Boolean);
    if (mapped.length) {
      products = mapped;
    }
  } catch (_error) {
    // keep fallback products if API is unavailable
  }
}

function openFiltersDrawer() {
  if (!mobileQuery.matches) return;
  document.body.classList.add("filter-open");
}

function closeFiltersDrawer() {
  document.body.classList.remove("filter-open");
}

function getProductById(id) {
  return products.find((item) => item.id === id) || null;
}

function getProductStock(product) {
  return Math.max(0, Number(product && product.stock) || 0);
}

function getRemainingStock(productId, ignoreKey) {
  const product = getProductById(productId);
  if (!product) return 0;
  const reservedInCart = cart.reduce((sum, item) => {
    if (item.productId !== productId) return sum;
    if (ignoreKey && item.key === ignoreKey) return sum;
    return sum + (Number(item.qty) || 0);
  }, 0);
  return Math.max(0, getProductStock(product) - reservedInCart);
}

function availabilityLabel(product, remaining) {
  const value = remaining === undefined ? getProductStock(product) : remaining;
  if (value <= 0) return "Rupture de stock";
  if (value <= 3) return `Plus que ${value} en stock`;
  return `${value} disponibles`;
}

function reconcileCartWithInventory() {
  let changed = false;
  cart = cart
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product || getProductStock(product) <= 0) {
        changed = true;
        return null;
      }
      const allowedQty = Math.min(item.qty, getRemainingStock(item.productId, item.key) + item.qty);
      if (allowedQty !== item.qty) {
        changed = true;
        return { ...item, qty: allowedQty };
      }
      return item;
    })
    .filter(Boolean);

  if (changed) saveCart();
}

function getVariantColors(product) {
  const base = colorVariants[product.couleur] || [product.couleur, `${product.couleur} Clair`, `${product.couleur} Fonce`];
  return base.slice(0, Math.max(2, Math.min(product.colors, base.length)));
}

function getVariantSizes(product) {
  return sizesByForme[product.forme] || ["S", "M", "L"];
}

function renderQuickOptions(container, options, activeValue, dataKey) {
  container.innerHTML = options
    .map((option) => {
      const activeClass = option === activeValue ? "active" : "";
      return `<button class="option-btn ${activeClass}" type="button" data-option-key="${dataKey}" data-option-value="${option}">${option}</button>`;
    })
    .join("");
}

function syncQuickViewQtyControls() {
  const remaining = getRemainingStock(quickViewState.productId);
  if (qvQtyMinus) qvQtyMinus.disabled = remaining <= 0 || quickViewState.qty <= 1;
  if (qvQtyPlus) qvQtyPlus.disabled = remaining <= 0 || quickViewState.qty >= remaining;
  if (qvAddToCart) qvAddToCart.disabled = remaining <= 0;
}

function openQuickView(productId) {
  const product = getProductById(productId);
  if (!product || !quickViewModal) return;
  const remaining = getRemainingStock(product.id);

  const colors = getVariantColors(product);
  const sizes = getVariantSizes(product);

  quickViewState.productId = product.id;
  quickViewState.color = colors[0];
  quickViewState.size = sizes[0];
  quickViewState.qty = 1;

  qvImage.src = product.image;
  qvImage.alt = product.name;
  qvTitle.textContent = product.name;
  qvMeta.textContent = `${product.genre} | ${product.forme} | ${product.matiere}`;
  if (qvStock) {
    qvStock.textContent = availabilityLabel(product, remaining);
    qvStock.className = `quickview-stock ${remaining <= 0 ? "is-out" : remaining <= 3 ? "is-low" : "is-in"}`;
  }
  qvPrice.textContent = `DH ${product.price.toFixed(2)}`;
  qvBadge.textContent = product.nouveaute ? "Nouveaute" : "Edition permanente";
  quickViewState.qty = remaining > 0 ? 1 : 0;
  qvQtyValue.textContent = String(Math.max(quickViewState.qty, 0));
  qvMessage.textContent = remaining > 0 ? "" : "Ce modele n'est plus disponible pour le moment.";
  renderQuickOptions(qvColors, colors, quickViewState.color, "color");
  renderQuickOptions(qvSizes, sizes, quickViewState.size, "size");
  syncQuickViewQtyControls();

  document.body.classList.add("quickview-open");
  quickViewModal.setAttribute("aria-hidden", "false");
}

function closeQuickView() {
  if (!quickViewModal) return;
  document.body.classList.remove("quickview-open");
  quickViewModal.setAttribute("aria-hidden", "true");
}

function openCart() {
  if (!cartDrawer) return;
  document.body.classList.add("cart-open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  if (!cartDrawer) return;
  document.body.classList.remove("cart-open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function openCheckout() {
  if (!checkoutModal) return;
  checkoutStep = 1;
  renderCheckoutStep();
  checkoutErrorNode.textContent = "";
  document.body.classList.add("checkout-open");
  checkoutModal.setAttribute("aria-hidden", "false");
}

function closeCheckout() {
  if (!checkoutModal) return;
  document.body.classList.remove("checkout-open");
  checkoutModal.setAttribute("aria-hidden", "true");
}

function getCartItemKey(item) {
  return `${item.productId}::${item.color}::${item.size}`;
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (_err) {
    // no-op if storage is blocked
  }
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) cart = parsed;
  } catch (_err) {
    cart = [];
  }
}

function cartTotalQty() {
  return cart.reduce((sum, item) => sum + (item.qty || 0), 0);
}

function cartSubtotal() {
  return cart.reduce((sum, item) => sum + (item.qty * item.price), 0);
}

function shippingCost() {
  const selected = document.querySelector('input[name="shippingMethod"]:checked');
  return selected && selected.value === "express" ? 19 : 9;
}

function renderCart() {
  if (cartCountNode) cartCountNode.textContent = String(cartTotalQty());
  if (cartSubtotalNode) cartSubtotalNode.textContent = `DH ${cartSubtotal().toFixed(2)}`;
  if (!cartItemsNode) return;

  if (!cart.length) {
    cartItemsNode.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
    return;
  }

  cartItemsNode.innerHTML = cart.map((item, index) => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>${item.color} | Taille ${item.size}</p>
        <p class="cart-stock">${availabilityLabel(getProductById(item.productId), getRemainingStock(item.productId, item.key) + item.qty)}</p>
        <p class="price">DH ${(item.price * item.qty).toFixed(2)}</p>
        <div class="cart-controls">
          <button type="button" data-cart-action="minus" data-cart-index="${index}">−</button>
          <strong>${item.qty}</strong>
          <button type="button" data-cart-action="plus" data-cart-index="${index}">+</button>
        </div>
      </div>
      <button class="remove-item" type="button" data-cart-action="remove" data-cart-index="${index}">Retirer</button>
    </article>
  `).join("");
}

function addCurrentQuickViewToCart() {
  const product = getProductById(quickViewState.productId);
  if (!product) return;
  const remaining = getRemainingStock(product.id);
  if (remaining <= 0) {
    qvMessage.textContent = "Stock indisponible pour ce modele.";
    qvAddToCart.disabled = true;
    return;
  }

  const entry = {
    key: getCartItemKey({
      productId: product.id,
      color: quickViewState.color,
      size: quickViewState.size
    }),
    productId: product.id,
    name: product.name,
    color: quickViewState.color,
    size: quickViewState.size,
    qty: quickViewState.qty,
    price: product.price,
    image: product.image
  };

  const existing = cart.find((item) => item.key === entry.key);
  const requestedQty = Math.max(1, entry.qty);
  if (existing) {
    const allowed = getRemainingStock(product.id, existing.key) + existing.qty;
    existing.qty = Math.min(allowed, existing.qty + requestedQty);
  } else {
    cart.push({ ...entry, qty: Math.min(remaining, requestedQty) });
  }

  saveCart();
  renderCart();
  syncQuickViewQtyControls();
}

function clearInvalidMarks() {
  Object.values(checkoutForm).forEach((node) => {
    if (!node) return;
    node.classList.remove("invalid");
  });
}

function markInvalid(node) {
  if (!node) return;
  node.classList.add("invalid");
}

function isEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function digitsOnly(value) {
  return value.replace(/\D/g, "");
}

function validateCheckoutStep(step) {
  clearInvalidMarks();
  checkoutErrorNode.textContent = "";

  if (step === 1) {
    const name = checkoutForm.name.value.trim();
    const email = checkoutForm.email.value.trim();
    const phone = digitsOnly(checkoutForm.phone.value);
    if (name.length < 3) {
      markInvalid(checkoutForm.name);
      checkoutErrorNode.textContent = "Nom complet invalide.";
      return false;
    }
    if (!isEmailValid(email)) {
      markInvalid(checkoutForm.email);
      checkoutErrorNode.textContent = "Email invalide.";
      return false;
    }
    if (phone.length < 8) {
      markInvalid(checkoutForm.phone);
      checkoutErrorNode.textContent = "Téléphone invalide.";
      return false;
    }
    return true;
  }

  if (step === 2) {
    const address = checkoutForm.address.value.trim();
    const city = checkoutForm.city.value.trim();
    const zip = checkoutForm.zip.value.trim();
    const country = checkoutForm.country.value;
    if (address.length < 5) {
      markInvalid(checkoutForm.address);
      checkoutErrorNode.textContent = "Adresse invalide.";
      return false;
    }
    if (city.length < 2) {
      markInvalid(checkoutForm.city);
      checkoutErrorNode.textContent = "Ville invalide.";
      return false;
    }
    if (zip.length < 3) {
      markInvalid(checkoutForm.zip);
      checkoutErrorNode.textContent = "Code postal invalide.";
      return false;
    }
    if (!country) {
      markInvalid(checkoutForm.country);
      checkoutErrorNode.textContent = "Veuillez choisir un pays.";
      return false;
    }
    return true;
  }

  if (step === 3) {
    const cardName = checkoutForm.cardName.value.trim();
    const cardNumber = digitsOnly(checkoutForm.cardNumber.value);
    const cardExpiry = checkoutForm.cardExpiry.value.trim();
    const cardCvc = digitsOnly(checkoutForm.cardCvc.value);
    const expiryOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry);
    if (cardName.length < 3) {
      markInvalid(checkoutForm.cardName);
      checkoutErrorNode.textContent = "Nom sur la carte invalide.";
      return false;
    }
    if (cardNumber.length < 13) {
      markInvalid(checkoutForm.cardNumber);
      checkoutErrorNode.textContent = "Numéro de carte invalide.";
      return false;
    }
    if (!expiryOk) {
      markInvalid(checkoutForm.cardExpiry);
      checkoutErrorNode.textContent = "Date d'expiration invalide.";
      return false;
    }
    if (cardCvc.length < 3) {
      markInvalid(checkoutForm.cardCvc);
      checkoutErrorNode.textContent = "CVC invalide.";
      return false;
    }
    return true;
  }

  return true;
}

function buildConfirmationSummary() {
  const itemsCount = cartTotalQty();
  const subtotal = cartSubtotal();
  const shipping = shippingCost();
  const total = subtotal + shipping;
  confirmationSummaryNode.innerHTML = [
    `<p><strong>Client:</strong> ${checkoutForm.name.value.trim()} (${checkoutForm.email.value.trim()})</p>`,
    `<p><strong>Livraison:</strong> ${checkoutForm.address.value.trim()}, ${checkoutForm.city.value.trim()}, ${checkoutForm.zip.value.trim()}, ${checkoutForm.country.value}</p>`,
    `<p><strong>Articles:</strong> ${itemsCount}</p>`,
    `<p><strong>Sous-total:</strong> DH ${subtotal.toFixed(2)}</p>`,
    `<p><strong>Livraison:</strong> DH ${shipping.toFixed(2)}</p>`,
    `<p><strong>Total:</strong> DH ${total.toFixed(2)}</p>`
  ].join("");
}

function orderPayload() {
  return {
    customer: {
      name: checkoutForm.name.value.trim(),
      email: checkoutForm.email.value.trim(),
      phone: checkoutForm.phone.value.trim()
    },
    shipping: {
      address: checkoutForm.address.value.trim(),
      city: checkoutForm.city.value.trim(),
      zip: checkoutForm.zip.value.trim(),
      country: checkoutForm.country.value,
      method: (document.querySelector('input[name="shippingMethod"]:checked') || {}).value || "standard",
      cost: shippingCost()
    },
    items: cart.map((item) => ({
      product_id: item.productId,
      qty: item.qty,
      color: item.color,
      size: item.size
    }))
  };
}

async function submitOrder() {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(orderPayload())
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const details = payload && payload.details;
    if (payload.error === "insufficient_stock" && details) {
      return {
        ok: false,
        message: `${details.title || "Un produit"} n'a plus assez de stock. Disponible: ${details.available}.`
      };
    }
    return {
      ok: false,
      message: "Impossible d'enregistrer la commande pour le moment."
    };
  }

  return { ok: true, data: payload };
}

function renderCheckoutStep() {
  checkoutSteps.forEach((item, index) => {
    const stepNumber = index + 1;
    item.section.classList.toggle("active", checkoutStep === stepNumber);
    item.label.classList.toggle("active", checkoutStep === stepNumber);
  });

  checkoutPrevButton.style.visibility = checkoutStep === 1 ? "hidden" : "visible";
  checkoutNextButton.textContent = checkoutStep === 4 ? "Valider la commande" : "Continuer";

  if (checkoutStep === 4) {
    buildConfirmationSummary();
  }
}

function activeFilterEntries() {
  return filterInputs
    .filter((input) => input.checked)
    .map((input) => ({
      name: input.name,
      value: input.value
    }));
}

function renderActiveFilters() {
  if (!activeFiltersNode) return;
  const active = activeFilterEntries();
  if (!active.length) {
    activeFiltersNode.innerHTML = "";
    return;
  }

  const chips = active.map((entry) => `
    <span class="filter-chip">
      ${entry.value}
      <button type="button" data-remove-name="${entry.name}" data-remove-value="${entry.value}" aria-label="Retirer ${entry.value}">×</button>
    </span>
  `);
  chips.push('<button class="filter-chip chip-clear-all" type="button" data-clear-all="1">Effacer tout</button>');
  activeFiltersNode.innerHTML = chips.join("");
}

function resetAllFilters({ closeDrawer = false } = {}) {
  filterInputs.forEach((input) => {
    input.checked = false;
  });
  if (searchInput) searchInput.value = "";
  if (searchSuggestions) searchSuggestions.innerHTML = "";
  sortSelect.value = "featured";
  visibleCount = PAGE_SIZE;
  render();
  if (closeDrawer) closeFiltersDrawer();
}

function selectedValues(groupName) {
  return filterInputs
    .filter((input) => input.name === groupName && input.checked)
    .map((input) => input.value);
}

function readInitialFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const entries = [
    ['category', params.get('category')],
    ['genre', params.get('genre')],
    ['couleur', params.get('couleur')],
    ['forme', params.get('forme')],
    ['matiere', params.get('matiere')]
  ];

  entries.forEach(([name, value]) => {
    if (!value) return;
    const input = filterInputs.find((item) => item.name === name && item.value === value);
    if (input) input.checked = true;
  });

  const q = params.get("q");
  if (q && searchInput) {
    searchInput.value = q;
  }
}

function buildSearchIndex(product) {
  return normalizeSearchText([
    product.name,
    product.category,
    product.genre,
    product.couleur,
    product.forme,
    product.matiere,
    Array.isArray(product.extra) ? product.extra.join(" ") : ""
  ].join(" "));
}

function updateSearchSuggestions() {
  if (!searchSuggestions || !searchInput) return;
  const query = getSearchValue();
  if (!query || query.length < 2) {
    searchSuggestions.innerHTML = "";
    return;
  }

  const terms = new Set();
  products.forEach((product) => {
    const candidates = [
      product.name,
      product.category,
      product.genre,
      product.couleur,
      product.forme,
      product.matiere
    ];
    candidates.forEach((value) => {
      const raw = String(value || "").trim();
      if (!raw) return;
      if (normalizeSearchText(raw).includes(query)) terms.add(raw);
    });
  });

  if ("ray".includes(query) || query.includes("ray")) terms.add("RayBan");

  const list = Array.from(terms).slice(0, 8);
  searchSuggestions.innerHTML = list
    .map((item) => `<option value="${item.replaceAll('"', "&quot;")}"></option>`)
    .join("");
}

function applyFilters(items) {
  const category = selectedValues("category");
  const genre = selectedValues("genre");
  const couleur = selectedValues("couleur");
  const forme = selectedValues("forme");
  const matiere = selectedValues("matiere");
  const extra = selectedValues("extra");
  const query = getSearchValue();
  const mappedQuery = SEARCH_ALIASES[query] || query;

  return items.filter((item) => {
    const searchBlob = buildSearchIndex(item);
    const bySearch = !mappedQuery || searchBlob.includes(mappedQuery);
    const byCategory = !category.length || category.includes(item.category || "Solaire");
    const byGenre = !genre.length || genre.includes(item.genre);
    const byCouleur = !couleur.length || couleur.includes(item.couleur);
    const byForme = !forme.length || forme.includes(item.forme);
    const byMatiere = !matiere.length || matiere.includes(item.matiere);
    const byExtra = !extra.length || extra.every((val) => item.extra.includes(val));
    return bySearch && byCategory && byGenre && byCouleur && byForme && byMatiere && byExtra;
  });
}

function applySort(items) {
  const value = sortSelect.value;
  const arr = [...items];

  if (value === "priceAsc") arr.sort((a, b) => a.price - b.price);
  if (value === "priceDesc") arr.sort((a, b) => b.price - a.price);
  if (value === "az") arr.sort((a, b) => a.name.localeCompare(b.name));
  if (value === "za") arr.sort((a, b) => b.name.localeCompare(a.name));
  return arr;
}

function cardTemplate(product) {
  const badges = [];
  if (product.nouveaute) badges.push('<span class="badge">Nouveaute</span>');
  if (product.extra.includes("Polarisant")) badges.push('<span class="badge">Polarisant</span>');
  badges.push(`<span class="badge">${product.couleur}</span>`);
  const stock = getProductStock(product);
  const availabilityClass = stock <= 0 ? "is-out" : stock <= 3 ? "is-low" : "is-in";
  const quickLabel = stock <= 0 ? "Indisponible" : "Vue rapide";

  return `
    <article class="product-card">
      <div class="product-media">
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <button class="quick-view" type="button" data-quick-product="${product.id}" ${stock <= 0 ? "disabled" : ""}>${quickLabel}</button>
      </div>
      <div class="product-body">
        <div class="badges">${badges.join("")}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-meta">${product.genre} | ${product.forme} | ${product.matiere}</p>
        <p class="product-colors">${product.colors} couleurs</p>
        <p class="product-price">Des ${product.price.toFixed(2)} DH</p>
        <p class="product-availability ${availabilityClass}">${availabilityLabel(product, stock)}</p>
        <a class="product-link" href="#">Essayer en ligne</a>
      </div>
    </article>
  `;
}

function render() {
  const filtered = applyFilters(products);
  const ordered = applySort(filtered);
  const visible = ordered.slice(0, visibleCount);
  countNode.textContent = ordered.length.toString();
  if (applyFiltersButton) {
    applyFiltersButton.textContent = `Voir les produits (${ordered.length})`;
  }
  renderActiveFilters();

  if (!ordered.length) {
    grid.innerHTML = '<p>Aucun produit ne correspond a ces filtres.</p>';
    if (loadMoreButton) loadMoreButton.style.display = "none";
    return;
  }

  grid.innerHTML = visible.map(cardTemplate).join("");
  if (loadMoreButton) {
    if (visible.length < ordered.length) {
      const remaining = ordered.length - visible.length;
      loadMoreButton.textContent = `Charger plus (${remaining})`;
      loadMoreButton.style.display = "inline-block";
    } else {
      loadMoreButton.style.display = "none";
    }
  }
}

filterInputs.forEach((input) => input.addEventListener("change", () => {
  visibleCount = PAGE_SIZE;
  render();
}));
sortSelect.addEventListener("change", () => {
  visibleCount = PAGE_SIZE;
  render();
});
if (searchInput) {
  searchInput.addEventListener("input", () => {
    visibleCount = PAGE_SIZE;
    updateSearchSuggestions();
    render();
  });
  searchInput.addEventListener("change", () => {
    visibleCount = PAGE_SIZE;
    render();
  });
}
resetButton.addEventListener("click", () => {
  resetAllFilters({ closeDrawer: true });
});

if (openFiltersButton) openFiltersButton.addEventListener("click", openFiltersDrawer);
if (closeFiltersButton) closeFiltersButton.addEventListener("click", closeFiltersDrawer);
if (filtersOverlay) filtersOverlay.addEventListener("click", closeFiltersDrawer);
if (applyFiltersButton) applyFiltersButton.addEventListener("click", closeFiltersDrawer);
if (clearFiltersMobileButton) clearFiltersMobileButton.addEventListener("click", () => resetAllFilters());
if (loadMoreButton) {
  loadMoreButton.addEventListener("click", () => {
    visibleCount += PAGE_SIZE;
    render();
  });
}

if (grid) {
  grid.addEventListener("click", (event) => {
    const quickTarget = event.target.closest("[data-quick-product]");
    if (!quickTarget) return;
    const id = Number(quickTarget.getAttribute("data-quick-product"));
    openQuickView(id);
  });
}

if (quickViewModal) {
  quickViewModal.addEventListener("click", (event) => {
    const closeTarget = event.target.closest("[data-quick-close]");
    if (closeTarget) closeQuickView();

    const optionTarget = event.target.closest("[data-option-key]");
    if (!optionTarget) return;
    const key = optionTarget.getAttribute("data-option-key");
    const value = optionTarget.getAttribute("data-option-value");
    if (key === "color") quickViewState.color = value;
    if (key === "size") quickViewState.size = value;

    const currentProduct = getProductById(quickViewState.productId);
    if (!currentProduct) return;
    renderQuickOptions(qvColors, getVariantColors(currentProduct), quickViewState.color, "color");
    renderQuickOptions(qvSizes, getVariantSizes(currentProduct), quickViewState.size, "size");
  });
}

if (qvClose) qvClose.addEventListener("click", closeQuickView);
if (qvQtyMinus) {
  qvQtyMinus.addEventListener("click", () => {
    quickViewState.qty = Math.max(1, quickViewState.qty - 1);
    qvQtyValue.textContent = String(quickViewState.qty);
    syncQuickViewQtyControls();
  });
}
if (qvQtyPlus) {
  qvQtyPlus.addEventListener("click", () => {
    const remaining = getRemainingStock(quickViewState.productId);
    quickViewState.qty = Math.min(Math.max(1, remaining), quickViewState.qty + 1);
    qvQtyValue.textContent = String(quickViewState.qty);
    syncQuickViewQtyControls();
  });
}
if (qvAddToCart) {
  qvAddToCart.addEventListener("click", () => {
    const product = getProductById(quickViewState.productId);
    if (!product) return;
    addCurrentQuickViewToCart();
    if (qvAddToCart.disabled) return;
    qvMessage.textContent = `${product.name} ajoute au panier (${quickViewState.size}, ${quickViewState.color})`;
    openCart();
  });
}

if (openCartButton) openCartButton.addEventListener("click", openCart);
if (closeCartButton) closeCartButton.addEventListener("click", closeCart);
if (cartDrawer) {
  cartDrawer.addEventListener("click", (event) => {
    const closeTarget = event.target.closest("[data-cart-close]");
    if (closeTarget) {
      closeCart();
      return;
    }

    const actionTarget = event.target.closest("[data-cart-action]");
    if (!actionTarget) return;
    const action = actionTarget.getAttribute("data-cart-action");
    const index = Number(actionTarget.getAttribute("data-cart-index"));
    const item = cart[index];
    if (!item) return;

    if (action === "minus") item.qty = Math.max(1, item.qty - 1);
    if (action === "plus") item.qty = Math.min(getRemainingStock(item.productId, item.key) + item.qty, item.qty + 1);
    if (action === "remove") cart.splice(index, 1);
    saveCart();
    renderCart();
  });
}

if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    if (!cart.length) return;
    openCheckout();
  });
}

if (closeCheckoutButton) closeCheckoutButton.addEventListener("click", closeCheckout);
if (checkoutModal) {
  checkoutModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-checkout-close]")) closeCheckout();
  });
}

if (checkoutPrevButton) {
  checkoutPrevButton.addEventListener("click", () => {
    checkoutStep = Math.max(1, checkoutStep - 1);
    checkoutErrorNode.textContent = "";
    renderCheckoutStep();
  });
}

if (checkoutNextButton) {
  checkoutNextButton.addEventListener("click", async () => {
    if (checkoutStep < 4) {
      const ok = validateCheckoutStep(checkoutStep);
      if (!ok) return;
      checkoutStep += 1;
      checkoutErrorNode.textContent = "";
      renderCheckoutStep();
      return;
    }

    reconcileCartWithInventory();
    renderCart();
    if (!cart.length) {
      checkoutErrorNode.textContent = "Votre panier ne contient plus d'articles disponibles.";
      return;
    }

    checkoutNextButton.disabled = true;
    checkoutPrevButton.disabled = true;
    checkoutErrorNode.style.color = "#556071";
    checkoutErrorNode.textContent = "Enregistrement de la commande...";

    const result = await submitOrder();

    checkoutNextButton.disabled = false;
    checkoutPrevButton.disabled = false;

    if (!result.ok) {
      checkoutErrorNode.style.color = "#b42318";
      checkoutErrorNode.textContent = result.message;
      await loadProductsFromApi();
      reconcileCartWithInventory();
      renderCart();
      render();
      return;
    }

    const order = result.data.order;
    cart = [];
    saveCart();
    renderCart();
    await loadProductsFromApi();
    render();
    confirmationSummaryNode.innerHTML = [
      `<p><strong>Reference:</strong> ${order.reference}</p>`,
      `<p><strong>Client:</strong> ${order.customer_name} (${order.customer_email})</p>`,
      `<p><strong>Livraison:</strong> ${order.shipping_address}, ${order.shipping_city}, ${order.shipping_zip}, ${order.shipping_country}</p>`,
      `<p><strong>Total:</strong> DH ${Number(order.total).toFixed(2)}</p>`,
      `<p><strong>Statut:</strong> Commande recue, confirmation manuelle a suivre.</p>`
    ].join("");
    checkoutErrorNode.style.color = "#23643c";
    checkoutErrorNode.textContent = `Commande enregistree avec succes. Reference ${order.reference}.`;
  });
}

if (activeFiltersNode) {
  activeFiltersNode.addEventListener("click", (event) => {
    const clearTarget = event.target.closest("[data-clear-all]");
    if (clearTarget) {
      resetAllFilters();
      return;
    }

    const removeTarget = event.target.closest("[data-remove-name]");
    if (!removeTarget) return;

    const targetName = removeTarget.getAttribute("data-remove-name");
    const targetValue = removeTarget.getAttribute("data-remove-value");
    const input = filterInputs.find((item) => item.name === targetName && item.value === targetValue);
    if (!input) return;
    input.checked = false;
    visibleCount = PAGE_SIZE;
    render();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeFiltersDrawer();
  closeQuickView();
  closeCart();
  closeCheckout();
});

mobileQuery.addEventListener("change", () => {
  if (!mobileQuery.matches) closeFiltersDrawer();
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  const header = document.querySelector('.site-header') || document.querySelector('.header');
  const nav = document.querySelector('nav');
  if (header && nav && header.classList.contains('nav-open') && !header.contains(e.target)) {
    header.classList.remove('nav-open');
  }
});

async function initCatalog() {
  loadCart();
  renderCart();
  await loadProductsFromApi();
  reconcileCartWithInventory();
  renderCart();
  readInitialFiltersFromUrl();
  updateSearchSuggestions();
  render();
}

initCatalog();
