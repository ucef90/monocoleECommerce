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
    gallery: ["./modele_pk9_1_jylsc_pour_maison_bonnet.jpg", "./f_01-clifford-1-768x512.jpg", "./f_01-sully-1-768x512.jpg"],
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
    gallery: ["./h_01-ray-2-1-768x512.jpg", "./01-cordier-1-768x512.jpg", "./h_01-legendre-1-1-768x512.jpg"],
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
    gallery: ["./h_01-auguste-2-768x512.jpg", "./mb-aria.jpg", "./mb-seven.jpg"],
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
    gallery: ["./h_01-longuemare-4-768x512.jpg", "./mb-longuemare.jpg", "./mb-wall.jpg"],
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
    gallery: ["./f_01-sully-1-768x512.jpg", "./mb-lorenzo.jpg", "./mb-raph.jpg"],
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
    gallery: ["./f_01-clifford-1-768x512.jpg", "./01-cordier-1-768x512.jpg", "./mb-catch.jpg"],
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
    gallery: ["./f_01-seven-1-1-768x512.jpg", "./mb-seven.jpg", "./mb-stuart.jpg"],
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
    gallery: ["./01-cordier-1-768x512.jpg", "./h_01-ray-2-1-768x512.jpg", "./mb-catch.jpg"],
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
    gallery: ["./f_01-tom-15-768x512.jpg", "./mb-wall.jpg", "./mb-lorenzo.jpg"],
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
    gallery: ["./h_01-legendre-1-1-768x512.jpg", "./h_01-ray-2-1-768x512.jpg", "./mb-raph.jpg"],
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
    gallery: ["./f_01-sully-1-768x512.jpg", "./f_01-seven-1-1-768x512.jpg", "./mb-seven.jpg"],
    price: 185,
    base_price: 215,
    promo_price: 185,
    promo_active: true,
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
    gallery: ["./h_01-ray-2-1-768x512.jpg", "./richard_modele-terry-optimised.jpg", "./01-cordier-1-768x512.jpg"],
    price: 210,
    base_price: 245,
    promo_price: 210,
    promo_active: true,
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
    gallery: ["./h_01-auguste-2-768x512.jpg", "./mb-aria.jpg", "./mb-lorenzo.jpg"],
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
    gallery: ["./f_01-clifford-1-768x512.jpg", "./f_01-tom-15-768x512.jpg", "./mb-stuart.jpg"],
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
    gallery: ["./01-cordier-1-768x512.jpg", "./f_01-clifford-1-768x512.jpg", "./mb-catch.jpg"],
    price: 198,
    base_price: 228,
    promo_price: 198,
    promo_active: true,
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
    gallery: ["./richard_modele-terry-optimised.jpg", "./h_01-ray-2-1-768x512.jpg", "./mb-wall.jpg"],
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
    gallery: ["./f_01-seven-1-1-768x512.jpg", "./mb-seven.jpg", "./mb-aria.jpg"],
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
    gallery: ["./f_01-tom-15-768x512.jpg", "./mb-lorenzo.jpg", "./mb-raph.jpg"],
    price: 188,
    nouveaute: true,
    image: "./f_01-tom-15-768x512.jpg"
  },
  {
    id: 19,
    name: "Tina Junior",
    genre: "Enfant",
    couleur: "Rose",
    forme: "Carree",
    matiere: "Acetate",
    extra: [],
    colors: 3,
    stock: 6,
    gallery: ["./fit_aa_07630629487307_tina_front_sjkvovhpgxpuz832.webp", "./f_01-clifford-1-768x512.jpg", "./f_01-seven-1-1-768x512.jpg"],
    price: 120,
    nouveaute: true,
    image: "./fit_aa_07630629487307_tina_front_sjkvovhpgxpuz832.webp"
  },
  {
    id: 20,
    name: "Mini Ray",
    genre: "Enfant",
    couleur: "Noir",
    forme: "Ronde",
    matiere: "Acetate",
    extra: [],
    colors: 2,
    stock: 5,
    gallery: ["./fit_aa_07630629487307_tina_front_sjkvovhpgxpuz832.webp", "./h_01-ray-2-1-768x512.jpg", "./01-cordier-1-768x512.jpg"],
    price: 115,
    nouveaute: false,
    image: "./fit_aa_07630629487307_tina_front_sjkvovhpgxpuz832.webp"
  }
];

let products = fallbackProducts.slice();

const grid = document.getElementById("grid");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const collectionHeroMedia = document.getElementById("collectionHeroMedia");
const collectionHeroVideo = document.getElementById("collectionHeroVideo");
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
const qvZoom = document.getElementById("qvZoom");
const qvThumbs = document.getElementById("qvThumbs");
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
const qvTryOn = document.getElementById("qvTryOn");
const qvMessage = document.getElementById("qvMessage");
const qvLightbox = document.getElementById("qvLightbox");
const qvLightboxImage = document.getElementById("qvLightboxImage");
const qvLightboxPrev = document.getElementById("qvLightboxPrev");
const qvLightboxNext = document.getElementById("qvLightboxNext");
const qvLightboxClose = document.getElementById("qvLightboxClose");
const tryOnModal = document.getElementById("tryOnModal");
const tryOnCloseButton = document.getElementById("tryOnClose");
const tryOnTitle = document.getElementById("tryOnTitle");
const tryOnSubtitle = document.getElementById("tryOnSubtitle");
const tryOnStage = document.getElementById("tryOnStage");
const tryOnEmpty = document.getElementById("tryOnEmpty");
const tryOnPhoto = document.getElementById("tryOnPhoto");
const tryOnCamera = document.getElementById("tryOnCamera");
const tryOnFrame = document.getElementById("tryOnFrame");
const tryOnUpload = document.getElementById("tryOnUpload");
const tryOnStartCamera = document.getElementById("tryOnStartCamera");
const tryOnCapture = document.getElementById("tryOnCapture");
const tryOnStopCamera = document.getElementById("tryOnStopCamera");
const tryOnScale = document.getElementById("tryOnScale");
const tryOnY = document.getElementById("tryOnY");
const tryOnX = document.getElementById("tryOnX");
const tryOnRotate = document.getElementById("tryOnRotate");
const tryOnOpacity = document.getElementById("tryOnOpacity");
const tryOnScaleValue = document.getElementById("tryOnScaleValue");
const tryOnYValue = document.getElementById("tryOnYValue");
const tryOnXValue = document.getElementById("tryOnXValue");
const tryOnRotateValue = document.getElementById("tryOnRotateValue");
const tryOnOpacityValue = document.getElementById("tryOnOpacityValue");
const tryOnReset = document.getElementById("tryOnReset");
const tryOnDownload = document.getElementById("tryOnDownload");
const tryOnStatus = document.getElementById("tryOnStatus");
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
const pageParams = new URLSearchParams(window.location.search);
const promoMode = pageParams.get("promo") === "1";
const promoProductNames = new Set(["Sully Lumiere", "Ray Heritage", "Cordier Signature"]);
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
  qty: 1,
  images: [],
  imageIndex: 0
};
const tryOnState = {
  productId: null,
  photoSrc: "",
  frameSrc: "",
  usingCamera: false,
  stream: null,
  scale: 1,
  x: 0,
  y: 0,
  rotate: 0,
  opacity: 0.92
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
const tryOnDefaultsByForme = {
  Pilote: { scale: 1.06, y: -4, x: 0, rotate: 0, opacity: 0.92 },
  Ronde: { scale: 0.96, y: -2, x: 0, rotate: 0, opacity: 0.92 },
  Carree: { scale: 1.01, y: -2, x: 0, rotate: 0, opacity: 0.92 },
  Papillon: { scale: 1.04, y: -6, x: 0, rotate: 0, opacity: 0.9 }
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
  const genre = String(row.genre || inferFromText(rawText, ["Femme", "Homme", "Enfant", "Unisexe"], "Unisexe"));
  const couleur = String(row.couleur || inferFromText(rawText, ["Noir", "Ecaille", "Or", "Vert"], "Noir"));
  const forme = String(row.forme || inferFromText(rawText, ["Pilote", "Ronde", "Carree", "Papillon"], "Ronde"));
  const matiere = String(row.matiere || inferFromText(rawText, ["Acetate", "Metal", "Combine"], "Acetate"));
  const extraList = Array.isArray(row.extra) ? row.extra.map((item) => String(item)) : [];
  const isPolar = extraList.length ? extraList.includes("Polarisant") : /polar|polaris/i.test(rawText);
  const isOversize = extraList.length ? extraList.includes("Oversize") : /oversize/i.test(rawText);
  const image = pickFirst(row.image_url, gallery[0] || "./modele_pk9_1_jylsc_pour_maison_bonnet.jpg");
  const colors = Math.max(2, Math.min(6, gallery.length + 1));
  const images = Array.from(new Set([image].concat(gallery).filter(Boolean))).slice(0, 3);

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
    gallery: images,
    price: Number(pickFirst(row.price, 0)) || 0,
    base_price: Number(pickFirst(row.base_price, row.price, 0)) || 0,
    promo_price: Number(pickFirst(row.promo_price, 0)) || 0,
    promo_active: !!row.promo_active && (Number(pickFirst(row.promo_price, 0)) || 0) > 0,
    nouveaute: !!row.active,
    image
  };
}

function getDisplayPrice(product) {
  const basePrice = Number(product.base_price ?? product.price) || 0;
  const promoPrice = Number(product.promo_price) || 0;
  const promoActive = !!product.promo_active && promoPrice > 0;
  const currentPrice = promoActive ? promoPrice : (Number(product.price) || basePrice);
  return { basePrice, promoPrice, promoActive, currentPrice };
}

function productPriceMarkup(product, options) {
  const settings = options || {};
  const { basePrice, promoPrice, promoActive, currentPrice } = getDisplayPrice(product);
  const prefix = settings.prefix || "";

  if (promoActive) {
    return `${prefix}<span class="price-original">DH ${basePrice.toFixed(2)}</span><span class="price-current">DH ${promoPrice.toFixed(2)}</span>`;
  }

  return `${prefix}<span class="price-current">DH ${currentPrice.toFixed(2)}</span>`;
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

function getQuickViewImages(product) {
  const images = Array.isArray(product && product.gallery) ? product.gallery.filter(Boolean) : [];
  return Array.from(new Set([product.image].concat(images).filter(Boolean))).slice(0, 3);
}

function renderQuickViewImage() {
  const src = quickViewState.images[quickViewState.imageIndex] || quickViewState.images[0] || "";
  if (qvImage) {
    qvImage.src = src;
    qvImage.alt = qvTitle ? qvTitle.textContent : "Produit";
  }
  if (!qvThumbs) return;
  qvThumbs.innerHTML = quickViewState.images.map((image, index) => {
    const activeClass = index === quickViewState.imageIndex ? "active" : "";
    return `<button class="quickview-thumb ${activeClass}" type="button" data-thumb-index="${index}" aria-label="Voir l'angle ${index + 1}"><img src="${image}" alt="Vue ${index + 1}"></button>`;
  }).join("");
}

function openQuickViewLightbox() {
  if (!qvLightbox || !qvLightboxImage) return;
  const src = quickViewState.images[quickViewState.imageIndex] || (qvImage && qvImage.src) || "";
  if (!src) return;
  qvLightboxImage.src = src;
  qvLightboxImage.alt = qvImage ? qvImage.alt : "Produit en grand";
  qvLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("qv-lightbox-open");
}

function closeQuickViewLightbox() {
  if (!qvLightbox) return;
  qvLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("qv-lightbox-open");
}

function shiftQuickViewImage(step) {
  if (!quickViewState.images.length) return;
  const total = quickViewState.images.length;
  quickViewState.imageIndex = (quickViewState.imageIndex + step + total) % total;
  renderQuickViewImage();
  if (document.body.classList.contains("qv-lightbox-open")) {
    openQuickViewLightbox();
  }
}

function syncQuickViewQtyControls() {
  const remaining = getRemainingStock(quickViewState.productId);
  if (qvQtyMinus) qvQtyMinus.disabled = remaining <= 0 || quickViewState.qty <= 1;
  if (qvQtyPlus) qvQtyPlus.disabled = remaining <= 0 || quickViewState.qty >= remaining;
  if (qvAddToCart) qvAddToCart.disabled = remaining <= 0;
}

function getTryOnDefaultSettings(product) {
  return {
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 0.92,
    ...(tryOnDefaultsByForme[product && product.forme] || {})
  };
}

function updateTryOnSliderLabels() {
  if (tryOnScaleValue) tryOnScaleValue.textContent = `${Math.round(tryOnState.scale * 100)}%`;
  if (tryOnYValue) tryOnYValue.textContent = `${tryOnState.y} px`;
  if (tryOnXValue) tryOnXValue.textContent = `${tryOnState.x} px`;
  if (tryOnRotateValue) tryOnRotateValue.textContent = `${tryOnState.rotate} deg`;
  if (tryOnOpacityValue) tryOnOpacityValue.textContent = `${Math.round(tryOnState.opacity * 100)}%`;
}

function syncTryOnControls() {
  if (tryOnScale) tryOnScale.value = String(Math.round(tryOnState.scale * 100));
  if (tryOnY) tryOnY.value = String(tryOnState.y);
  if (tryOnX) tryOnX.value = String(tryOnState.x);
  if (tryOnRotate) tryOnRotate.value = String(tryOnState.rotate);
  if (tryOnOpacity) tryOnOpacity.value = String(Math.round(tryOnState.opacity * 100));
  updateTryOnSliderLabels();
}

function updateTryOnStage() {
  if (!tryOnStage || !tryOnFrame || !tryOnPhoto || !tryOnCamera || !tryOnEmpty) return;
  const hasPhoto = !!tryOnState.photoSrc;
  tryOnStage.style.setProperty("--tryon-scale", String(tryOnState.scale));
  tryOnStage.style.setProperty("--tryon-x", `${tryOnState.x}px`);
  tryOnStage.style.setProperty("--tryon-y", `${tryOnState.y}px`);
  tryOnStage.style.setProperty("--tryon-rotate", `${tryOnState.rotate}deg`);
  tryOnStage.style.setProperty("--tryon-opacity", String(tryOnState.opacity));
  tryOnPhoto.style.display = hasPhoto ? "block" : "none";
  tryOnFrame.style.display = hasPhoto && tryOnState.frameSrc ? "block" : "none";
  tryOnEmpty.style.display = hasPhoto || tryOnState.usingCamera ? "none" : "grid";
  tryOnCamera.style.display = tryOnState.usingCamera ? "block" : "none";
  if (tryOnDownload) tryOnDownload.disabled = !hasPhoto;
}

function setTryOnPhotoSource(src) {
  tryOnState.photoSrc = src || "";
  if (tryOnPhoto) {
    tryOnPhoto.src = tryOnState.photoSrc;
  }
  tryOnState.usingCamera = false;
  if (tryOnCapture) tryOnCapture.disabled = true;
  if (tryOnStopCamera) tryOnStopCamera.disabled = !tryOnState.stream;
  updateTryOnStage();
}

function stopTryOnCamera() {
  if (tryOnState.stream) {
    tryOnState.stream.getTracks().forEach((track) => track.stop());
  }
  tryOnState.stream = null;
  tryOnState.usingCamera = false;
  if (tryOnCamera) {
    tryOnCamera.pause();
    tryOnCamera.srcObject = null;
    tryOnCamera.style.display = "none";
  }
  if (tryOnCapture) tryOnCapture.disabled = true;
  if (tryOnStopCamera) tryOnStopCamera.disabled = true;
  updateTryOnStage();
}

async function startTryOnCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (tryOnStatus) tryOnStatus.textContent = "La camera n'est pas disponible sur cet appareil.";
    return;
  }

  try {
    stopTryOnCamera();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false
    });
    tryOnState.stream = stream;
    tryOnState.usingCamera = true;
    if (tryOnCamera) {
      tryOnCamera.srcObject = stream;
      await tryOnCamera.play().catch(() => {});
    }
    if (tryOnCapture) tryOnCapture.disabled = false;
    if (tryOnStopCamera) tryOnStopCamera.disabled = false;
    if (tryOnStatus) tryOnStatus.textContent = "Cadrez votre visage puis cliquez sur Capturer.";
    updateTryOnStage();
  } catch (_error) {
    if (tryOnStatus) tryOnStatus.textContent = "Impossible d'activer la camera. Utilisez plutot une photo.";
  }
}

function captureTryOnPhoto() {
  if (!tryOnCamera || !tryOnCamera.videoWidth || !tryOnCamera.videoHeight) {
    if (tryOnStatus) tryOnStatus.textContent = "La camera n'est pas prete pour la capture.";
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = tryOnCamera.videoWidth;
  canvas.height = tryOnCamera.videoHeight;
  const context = canvas.getContext("2d");
  if (!context) return;
  context.drawImage(tryOnCamera, 0, 0, canvas.width, canvas.height);
  setTryOnPhotoSource(canvas.toDataURL("image/png"));
  stopTryOnCamera();
  if (tryOnStatus) tryOnStatus.textContent = "Photo capturee. Ajustez maintenant la monture.";
}

function buildTransparentFrameCanvas(image) {
  const width = image.naturalWidth || image.width || 1;
  const height = image.naturalHeight || image.height || 1;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return image;

  context.drawImage(image, 0, 0, width, height);
  const pixels = context.getImageData(0, 0, width, height);
  const data = pixels.data;

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const nearWhite = red > 242 && green > 242 && blue > 242;
    const softWhite = red > 228 && green > 228 && blue > 228;
    if (nearWhite) {
      data[index + 3] = 0;
    } else if (softWhite) {
      data[index + 3] = Math.min(data[index + 3], 120);
    }
  }

  context.putImageData(pixels, 0, 0);
  return canvas;
}

function downloadTryOnPreview() {
  if (!tryOnState.photoSrc || !tryOnState.frameSrc) {
    if (tryOnStatus) tryOnStatus.textContent = "Ajoutez d'abord une photo pour exporter l'apercu.";
    return;
  }

  const photo = new Image();
  const frame = new Image();
  photo.src = tryOnState.photoSrc;
  frame.src = tryOnState.frameSrc;

  Promise.all([
    photo.decode().catch(() => undefined),
    frame.decode().catch(() => undefined)
  ]).then(() => {
    const width = photo.naturalWidth || 1200;
    const height = photo.naturalHeight || 1600;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(photo, 0, 0, width, height);
    const frameWidth = width * 0.72;
    const ratio = (frame.naturalHeight || 1) / (frame.naturalWidth || 1);
    const frameHeight = frameWidth * ratio;
    const centerX = width / 2 + (tryOnState.x / 100) * width * 0.35;
    const centerY = height / 2 + (tryOnState.y / 100) * height * 0.35;

    context.save();
    context.globalAlpha = tryOnState.opacity;
    context.translate(centerX, centerY);
    context.rotate((tryOnState.rotate * Math.PI) / 180);
    context.scale(tryOnState.scale, tryOnState.scale);
    const transparentFrame = buildTransparentFrameCanvas(frame);
    context.drawImage(transparentFrame, -frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight);
    context.restore();

    const link = document.createElement("a");
    const product = getProductById(tryOnState.productId);
    link.href = canvas.toDataURL("image/png");
    link.download = `${(product && product.name) || "monocle"}-essayage.png`;
    link.click();
    if (tryOnStatus) tryOnStatus.textContent = "Apercu telecharge avec succes.";
  }).catch(() => {
    if (tryOnStatus) tryOnStatus.textContent = "Impossible de generer l'apercu pour le moment.";
  });
}

function resetTryOnAdjustments(product) {
  const defaults = getTryOnDefaultSettings(product);
  tryOnState.scale = defaults.scale;
  tryOnState.x = defaults.x;
  tryOnState.y = defaults.y;
  tryOnState.rotate = defaults.rotate;
  tryOnState.opacity = defaults.opacity;
  syncTryOnControls();
  updateTryOnStage();
}

function openTryOn(productId) {
  const product = getProductById(productId);
  if (!product || !tryOnModal) return;
  closeQuickView();
  stopTryOnCamera();
  tryOnState.productId = product.id;
  tryOnState.frameSrc = product.image;
  tryOnState.photoSrc = "";
  if (tryOnFrame) {
    tryOnFrame.src = product.image;
    tryOnFrame.alt = `Monture ${product.name}`;
  }
  if (tryOnPhoto) {
    tryOnPhoto.src = "";
  }
  if (tryOnTitle) tryOnTitle.textContent = `Essayez ${product.name} sur votre photo`;
  if (tryOnSubtitle) {
    tryOnSubtitle.textContent = `${product.forme} ${product.couleur.toLowerCase()} ${product.genre.toLowerCase()} : chargez une photo de face et ajustez la monture en quelques secondes.`;
  }
  if (tryOnUpload) tryOnUpload.value = "";
  resetTryOnAdjustments(product);
  updateTryOnStage();
  if (tryOnStatus) tryOnStatus.textContent = "Importez une photo ou activez la camera pour commencer.";
  document.body.classList.add("tryon-open");
  tryOnModal.setAttribute("aria-hidden", "false");
}

function closeTryOn() {
  if (!tryOnModal) return;
  stopTryOnCamera();
  document.body.classList.remove("tryon-open");
  tryOnModal.setAttribute("aria-hidden", "true");
}

function openQuickView(productId) {
  const product = getProductById(productId);
  if (!product || !quickViewModal) return;
  const remaining = getRemainingStock(product.id);

  const colors = getVariantColors(product);
  const sizes = getVariantSizes(product);
  const images = getQuickViewImages(product);

  quickViewState.productId = product.id;
  quickViewState.color = colors[0];
  quickViewState.size = sizes[0];
  quickViewState.qty = 1;
  quickViewState.images = images;
  quickViewState.imageIndex = 0;

  qvTitle.textContent = product.name;
  qvMeta.textContent = `${product.genre} | ${product.forme} | ${product.matiere}`;
  if (qvStock) {
    qvStock.textContent = availabilityLabel(product, remaining);
    qvStock.className = `quickview-stock ${remaining <= 0 ? "is-out" : remaining <= 3 ? "is-low" : "is-in"}`;
  }
  qvPrice.className = `quickview-price ${product.promo_active ? "is-promo" : ""}`;
  qvPrice.innerHTML = productPriceMarkup(product);
  qvBadge.textContent = product.nouveaute ? "Nouveaute" : "Edition permanente";
  quickViewState.qty = remaining > 0 ? 1 : 0;
  qvQtyValue.textContent = String(Math.max(quickViewState.qty, 0));
  qvMessage.textContent = remaining > 0 ? "" : "Ce modele n'est plus disponible pour le moment.";
  renderQuickOptions(qvColors, colors, quickViewState.color, "color");
  renderQuickOptions(qvSizes, sizes, quickViewState.size, "size");
  renderQuickViewImage();
  syncQuickViewQtyControls();

  document.body.classList.add("quickview-open");
  quickViewModal.setAttribute("aria-hidden", "false");
}

function closeQuickView() {
  if (!quickViewModal) return;
  closeQuickViewLightbox();
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
  const params = pageParams;
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

  if (promoMode) {
    const heroEyebrow = document.getElementById("colHeroEyebrow");
    const heroTitle = document.getElementById("colHeroTitle");
    const heroBody = document.getElementById("colHeroBody");
    const toolbarSub = document.getElementById("colToolbarSub");
    const breadcrumb = document.getElementById("colHeroBreadcrumb");

    if (heroEyebrow) heroEyebrow.textContent = "Promotions";
    if (heroTitle) heroTitle.textContent = "Collection promotions Monocle";
    if (heroBody) heroBody.textContent = "Retrouvez directement les montures actuellement mises en avant en promotion, avec leurs visuels et leurs détails essentiels.";
    if (toolbarSub) toolbarSub.textContent = "Sélection des montures actuellement proposées en promotion.";
    if (breadcrumb) breadcrumb.textContent = "Accueil / Catalogue / Promotions";
  }
}

function updateCollectionHeroMedia() {
  if (!collectionHeroMedia) return;
  const genre = selectedValues("genre");
  const showMenVideo = true;
  collectionHeroMedia.hidden = !showMenVideo;

  if (!collectionHeroVideo) return;
  if (showMenVideo) {
    const playAttempt = collectionHeroVideo.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
    return;
  }

  collectionHeroVideo.pause();
  collectionHeroVideo.currentTime = 0;
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
    const byPromo = !promoMode || !!item.promo_active || promoProductNames.has(item.name);
    const byCategory = !category.length || category.includes(item.category || "Solaire");
    const byGenre = !genre.length || genre.includes(item.genre);
    const byCouleur = !couleur.length || couleur.includes(item.couleur);
    const byForme = !forme.length || forme.includes(item.forme);
    const byMatiere = !matiere.length || matiere.includes(item.matiere);
    const byExtra = !extra.length || extra.every((val) => item.extra.includes(val));
    return bySearch && byPromo && byCategory && byGenre && byCouleur && byForme && byMatiere && byExtra;
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
  if (promoMode && promoProductNames.has(product.name)) badges.push('<span class="badge">Promotion</span>');
  if (product.promo_active) badges.push('<span class="badge">Promo</span>');
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
        <p class="product-price ${product.promo_active ? "is-promo" : ""}">${productPriceMarkup(product, { prefix: "Des " })}</p>
        <p class="product-availability ${availabilityClass}">${availabilityLabel(product, stock)}</p>
        <button class="product-link tryon-link" type="button" data-try-product="${product.id}">Essayer en ligne</button>
      </div>
    </article>
  `;
}

function render() {
  updateCollectionHeroMedia();
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
    const tryTarget = event.target.closest("[data-try-product]");
    if (tryTarget) {
      const id = Number(tryTarget.getAttribute("data-try-product"));
      openTryOn(id);
      return;
    }
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

    const thumbTarget = event.target.closest("[data-thumb-index]");
    if (thumbTarget) {
      quickViewState.imageIndex = Number(thumbTarget.getAttribute("data-thumb-index") || "0");
      renderQuickViewImage();
      return;
    }

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
if (qvTryOn) qvTryOn.addEventListener("click", () => openTryOn(quickViewState.productId));
if (qvZoom) qvZoom.addEventListener("click", openQuickViewLightbox);
if (qvImage) qvImage.addEventListener("click", openQuickViewLightbox);
if (qvLightbox) {
  qvLightbox.addEventListener("click", (event) => {
    if (event.target.closest("[data-lightbox-close]")) closeQuickViewLightbox();
  });
}
if (qvLightboxPrev) qvLightboxPrev.addEventListener("click", () => shiftQuickViewImage(-1));
if (qvLightboxNext) qvLightboxNext.addEventListener("click", () => shiftQuickViewImage(1));
if (qvLightboxClose) qvLightboxClose.addEventListener("click", closeQuickViewLightbox);

if (tryOnModal) {
  tryOnModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-tryon-close]")) closeTryOn();
  });
}
if (tryOnCloseButton) tryOnCloseButton.addEventListener("click", closeTryOn);
if (tryOnUpload) {
  tryOnUpload.addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setTryOnPhotoSource(String(reader.result || ""));
      if (tryOnStatus) tryOnStatus.textContent = "Photo importee. Ajustez la monture avec les reglages.";
    };
    reader.readAsDataURL(file);
  });
}
if (tryOnStartCamera) tryOnStartCamera.addEventListener("click", startTryOnCamera);
if (tryOnCapture) tryOnCapture.addEventListener("click", captureTryOnPhoto);
if (tryOnStopCamera) tryOnStopCamera.addEventListener("click", () => {
  stopTryOnCamera();
  if (tryOnStatus) tryOnStatus.textContent = "Camera arretee. Vous pouvez importer une photo.";
});

[
  [tryOnScale, (value) => { tryOnState.scale = Number(value) / 100; }],
  [tryOnY, (value) => { tryOnState.y = Number(value); }],
  [tryOnX, (value) => { tryOnState.x = Number(value); }],
  [tryOnRotate, (value) => { tryOnState.rotate = Number(value); }],
  [tryOnOpacity, (value) => { tryOnState.opacity = Number(value) / 100; }]
].forEach(([node, updater]) => {
  if (!node) return;
  node.addEventListener("input", (event) => {
    updater(event.target.value);
    updateTryOnSliderLabels();
    updateTryOnStage();
  });
});

if (tryOnReset) {
  tryOnReset.addEventListener("click", () => {
    const product = getProductById(tryOnState.productId);
    if (!product) return;
    resetTryOnAdjustments(product);
    if (tryOnStatus) tryOnStatus.textContent = "Monture recentree avec les reglages recommandes.";
  });
}
if (tryOnDownload) tryOnDownload.addEventListener("click", downloadTryOnPreview);

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
  closeTryOn();
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
