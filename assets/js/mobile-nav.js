(() => {
  const initMobileNavigation = () => {
    const header = document.querySelector("header");
    const nav = header?.querySelector("nav");
    if (!header || !nav || header.querySelector(".mobile-nav-toggle")) return;

    const button = document.createElement("button");
    button.className = "mobile-nav-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Open navigation menu");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "site-navigation");
    button.innerHTML = '<span class="toggle-lines" aria-hidden="true"></span>';
    nav.id = nav.id || "site-navigation";
    nav.setAttribute("aria-label", "Main navigation");
    nav.setAttribute("data-mobile-menu", "true");
    header.insertBefore(button, nav);

    const closeMenu = () => {
      header.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation menu");
    };

    button.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("menu-open")) {
        closeMenu();
        button.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 961px)").matches) closeMenu();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNavigation, { once: true });
  } else {
    initMobileNavigation();
  }
})();

