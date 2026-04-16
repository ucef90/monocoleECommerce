(function () {
  function getCurrentNavKey() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    var params = new URLSearchParams(window.location.search);
    var hash = (window.location.hash || "").toLowerCase();

    if (path === "collections.html") return "collections";

    if (path === "collection.html") {
      var category = (params.get("category") || "").toLowerCase();
      if (category.indexOf("solaire") !== -1) return "solaire";
      return "optique";
    }

    if (path === "index.html" || path === "") {
      if (hash === "#atelier") return "atelier";
      return "home";
    }

    return "";
  }

  function applyActiveState() {
    var currentKey = getCurrentNavKey();
    if (!currentKey) return;

    Array.prototype.forEach.call(document.querySelectorAll("[data-nav]"), function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-nav") === currentKey);
    });
  }

  window.addEventListener("hashchange", applyActiveState);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyActiveState);
  } else {
    applyActiveState();
  }
})();
