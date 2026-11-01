// Northstar Studio — Week 3 JavaScript interactions
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const filterStatus = document.getElementById("filterStatus");
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");
  const backToTop = document.getElementById("backToTop");
  const toast = document.getElementById("toast");

  // Mobile navigation: toggle menu and close it after choosing a section.
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    });
  });

  // Light/dark theme toggle. The choice is remembered in localStorage.
  const savedTheme = localStorage.getItem("northstar-theme");
  if (savedTheme === "dark") document.documentElement.dataset.theme = "dark";
  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme !== "dark";
    if (isDark) {
      document.documentElement.dataset.theme = "dark";
      localStorage.setItem("northstar-theme", "dark");
    } else {
      delete document.documentElement.dataset.theme;
      localStorage.setItem("northstar-theme", "light");
    }
    updateThemeButton();
  });

  function updateThemeButton() {
    const isDark = document.documentElement.dataset.theme === "dark";
    themeToggle.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
  }

  // Portfolio filtering using data-category attributes.
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const show = selected === "all" || card.dataset.category === selected;
        card.classList.toggle("is-hidden", !show);
        if (show) visibleCount += 1;
      });

      const label = selected === "all" ? "all projects" : `${selected} projects`;
      filterStatus.textContent = `Showing ${visibleCount} ${label}.`;
    });
  });

  // Contact form validation and front-end success feedback.
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {
      showFormMessage("Please enter a name with at least 2 characters.", "error");
      document.getElementById("name").focus();
      return;
    }
    if (!emailPattern.test(email)) {
      showFormMessage("Please enter a valid email address.", "error");
      document.getElementById("email").focus();
      return;
    }
    if (message.length < 10) {
      showFormMessage("Please enter a message with at least 10 characters.", "error");
      document.getElementById("message").focus();
      return;
    }

    showFormMessage(`Thanks, ${name}! Your message passed validation.`, "success");
    contactForm.reset();
  });

  function showFormMessage(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
  }

  // Service card buttons show contextual feedback.
  document.querySelectorAll(".learn-more").forEach((button) => {
    button.addEventListener("click", () => {
      showToast(`${button.dataset.service}: contact us to discuss this service.`);
    });
  });

  // Back-to-top button appears after scrolling.
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 450);
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal sections as they enter the viewport.
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
  }
});
