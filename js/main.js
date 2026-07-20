document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  const toggleButtons = document.querySelectorAll(".navbar__toggle");

  toggleButtons.forEach((toggleButton) => {
    const mobileMenuId = toggleButton.getAttribute("aria-controls");
    const mobileMenu = document.getElementById(mobileMenuId);

    if (!mobileMenu) {
      return;
    }

    const closeMenu = () => {
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.setAttribute("aria-label", "Open navigation menu");
      mobileMenu.hidden = true;
      document.body.classList.remove("nav-open");

      const icon = toggleButton.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", "menu");
        lucide.createIcons();
      }
    };

    const openMenu = () => {
      toggleButton.setAttribute("aria-expanded", "true");
      toggleButton.setAttribute("aria-label", "Close navigation menu");
      mobileMenu.hidden = false;
      document.body.classList.add("nav-open");

      const icon = toggleButton.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", "x");
        lucide.createIcons();
      }
    };

    toggleButton.addEventListener("click", () => {
      const isExpanded =
        toggleButton.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  });
});