(function () {
  function storedTheme() {
    try {
      var raw = localStorage.getItem("theme-storage");
      var parsed = raw ? JSON.parse(raw) : null;
      return (parsed && parsed.state && parsed.state.theme) || "system";
    } catch (e) {
      return "system";
    }
  }

  function effectiveTheme(theme) {
    if (theme === "dark" || theme === "light") return theme;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme) {
    var effective = effectiveTheme(theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(effective);
    document.documentElement.setAttribute("data-theme", effective);
    try {
      localStorage.setItem("theme-storage", JSON.stringify({ state: { theme: theme }, version: 0 }));
    } catch (e) {}
    updateThemeButtons(theme);
  }

  function icon(theme) {
    if (theme === "dark") {
      return '<svg aria-hidden="true" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    if (theme === "light") {
      return '<svg aria-hidden="true" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7 1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2-1.4-1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    return '<svg aria-hidden="true" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="11" rx="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 20h8M12 16v4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll(".zc-theme-toggle").forEach(function (button) {
      button.innerHTML = icon(theme);
      button.setAttribute("title", "Theme: " + theme);
      button.setAttribute("aria-label", "Toggle color theme");
    });
  }

  function installThemeButtons() {
    document.querySelectorAll("div").forEach(function (node) {
      if (
        node.classList.contains("w-10") &&
        node.classList.contains("h-10") &&
        node.querySelector(".animate-pulse")
      ) {
        node.classList.add("zc-theme-toggle");
        node.setAttribute("role", "button");
        node.setAttribute("tabindex", "0");
        node.addEventListener("click", cycleTheme);
        node.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            cycleTheme();
          }
        });
      }
    });
    updateThemeButtons(storedTheme());
  }

  function cycleTheme() {
    var current = storedTheme();
    setTheme(current === "system" ? "light" : current === "light" ? "dark" : "system");
  }

  function init() {
    setTheme(storedTheme());
    installThemeButtons();
    installPublicationFilters();
    installAbstractToggles();
  }

  function installPublicationFilters() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-filter-group][data-filter-value]"));
    var cards = Array.prototype.slice.call(document.querySelectorAll(".zc-publication"));
    var search = document.querySelector("[data-publication-search]");
    var count = document.querySelector("[data-publication-count]");
    var panel = document.querySelector("[data-publication-filter-panel]");
    var toggle = document.querySelector("[data-publication-filter-toggle]");
    if (!cards.length) return;

    var active = { year: "", type: "", tag: "" };

    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        panel.hidden = !panel.hidden;
        toggle.classList.toggle("bg-accent", !panel.hidden);
        toggle.classList.toggle("text-white", !panel.hidden);
        toggle.classList.toggle("border-accent", !panel.hidden);
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var group = button.getAttribute("data-filter-group");
        var value = button.getAttribute("data-filter-value");
        active[group] = active[group] === value ? "" : value;
        buttons.forEach(function (node) {
          var same = node.getAttribute("data-filter-group") === group;
          var selected = same && active[group] === node.getAttribute("data-filter-value");
          node.classList.toggle("is-active", selected);
        });
        applyPublicationFilters();
      });
    });

    if (search) {
      search.addEventListener("input", applyPublicationFilters);
    }

    function applyPublicationFilters() {
      var query = search ? search.value.trim().toLowerCase() : "";
      var visibleCount = 0;
      cards.forEach(function (card) {
        var tags = card.getAttribute("data-tags") || "";
        var visible =
          (!active.year || card.getAttribute("data-year") === active.year) &&
          (!active.type || card.getAttribute("data-type") === active.type) &&
          (!active.tag || tags.split(/\s+/).indexOf(active.tag) !== -1) &&
          (!query || (card.getAttribute("data-search") || card.textContent).toLowerCase().indexOf(query) !== -1);
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (count) count.textContent = String(visibleCount);
    }

    applyPublicationFilters();
  }

  function installAbstractToggles() {
    document.querySelectorAll("[data-abstract-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var id = button.getAttribute("data-abstract-toggle");
        var panel = document.getElementById(id);
        if (!panel) return;
        var next = !panel.hidden;
        panel.hidden = next;
        button.classList.toggle("is-active", !next);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
