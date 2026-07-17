(() => {
  "use strict";

  const config = window.SITE_CONFIG;

  if (!config) {
    console.error("SITE_CONFIG is missing. Confirm site.config.js loads before app.js.");
    return;
  }

  const getValue = (object, path) =>
    path.split(".").reduce((value, key) => value?.[key], object);

  const setTextContent = () => {
    document.querySelectorAll("[data-config]").forEach((element) => {
      const value = getValue(config, element.dataset.config);
      if (typeof value === "string" || typeof value === "number") {
        element.textContent = value;
      }
    });
  };

  const setTheme = () => {
    const root = document.documentElement;
    const theme = config.theme || {};

    const variables = {
      "--color-primary": theme.primary,
      "--color-primary-deep": theme.primaryDeep,
      "--color-accent": theme.accent,
      "--color-accent-soft": theme.accentSoft,
      "--color-surface-muted": theme.surfaceMuted
    };

    Object.entries(variables).forEach(([name, value]) => {
      if (value) root.style.setProperty(name, value);
    });

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta && theme.primary) themeMeta.content = theme.primary;
  };

  const setBusinessLinks = () => {
    const phoneLink = `tel:${config.business.phoneLink}`;
    document.querySelectorAll("[data-phone-link]").forEach((link) => {
      link.href = phoneLink;
    });

    const emailHref = `mailto:${config.business.email}`;
    document.querySelector("#email-link")?.setAttribute("href", emailHref);
    document.querySelector("#footer-email-link")?.setAttribute("href", emailHref);

    const logo = config.business.logo;
    if (logo) {
      document.querySelector("#brand-logo")?.setAttribute("src", logo);
      document.querySelector("#footer-logo")?.setAttribute("src", logo);
    }

    const heroImage = config.hero.image;
    if (heroImage) {
      document.querySelector(".hero-media")?.style.setProperty(
        "background-image",
        `url("${heroImage}")`
      );
    }

    const aboutImage = config.about.image;
    if (aboutImage) {
      document.querySelector("#about-image")?.setAttribute("src", aboutImage);
    }
  };

  const setSeo = () => {
    document.title = config.seo.title;

    const values = {
      "#meta-description": config.seo.description,
      "#og-title": config.seo.title,
      "#og-description": config.seo.description,
      "#og-image": config.seo.socialImage
    };

    Object.entries(values).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element && value) element.setAttribute("content", value);
    });

    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: config.business.name,
      url: config.business.websiteUrl,
      image: config.seo.socialImage,
      telephone: config.business.phoneLink,
      email: config.business.email,
      areaServed: config.business.serviceArea,
      description: config.seo.description
    };

    document.querySelector("#local-business-schema").textContent =
      JSON.stringify(schema);
  };

  const createHeroPoints = () => {
    const container = document.querySelector("#hero-points");
    container.innerHTML = config.hero.points
      .map((point) => `<li>${escapeHtml(point)}</li>`)
      .join("");
  };

  const createStats = () => {
    const container = document.querySelector("#stats-grid");
    container.innerHTML = config.stats
      .map(
        (stat) => `
          <div class="stat reveal">
            <strong>${escapeHtml(stat.value)}</strong>
            <span>${escapeHtml(stat.label)}</span>
          </div>
        `
      )
      .join("");
  };

  const createServices = () => {
    const container = document.querySelector("#services-grid");
    const select = document.querySelector("#service-select");

    container.innerHTML = config.services
      .map(
        (service) => `
          <article class="service-card reveal">
            <div class="service-icon" aria-hidden="true">${escapeHtml(service.icon)}</div>
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.description)}</p>
            <a href="#contact">Request this service <span aria-hidden="true">→</span></a>
          </article>
        `
      )
      .join("");

    select.insertAdjacentHTML(
      "beforeend",
      config.services
        .map(
          (service) =>
            `<option value="${escapeAttribute(service.title)}">${escapeHtml(service.title)}</option>`
        )
        .join("")
    );
  };

  const createFeatures = () => {
    const container = document.querySelector("#feature-list");
    container.innerHTML = config.about.features
      .map(
        (feature) => `
          <article class="feature">
            <div class="feature-icon" aria-hidden="true">✓</div>
            <div>
              <h3>${escapeHtml(feature.title)}</h3>
              <p>${escapeHtml(feature.description)}</p>
            </div>
          </article>
        `
      )
      .join("");
  };

  const createProcess = () => {
    const container = document.querySelector("#process-grid");
    container.innerHTML = config.process
      .map(
        (step) => `
          <li class="process-step reveal">
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.description)}</p>
          </li>
        `
      )
      .join("");
  };

  const createGallery = () => {
    const container = document.querySelector("#gallery-grid");
    container.innerHTML = config.gallery
      .map(
        (item) => `
          <figure class="gallery-item reveal">
            <img src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.title)}" loading="lazy">
            <figcaption class="gallery-caption">
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.subtitle)}</span>
            </figcaption>
          </figure>
        `
      )
      .join("");
  };

  const createTestimonials = () => {
    const container = document.querySelector("#testimonial-grid");
    container.innerHTML = config.testimonials
      .map((testimonial) => {
        const initials = testimonial.name
          .split(/\s+/)
          .map((part) => part.charAt(0))
          .join("")
          .slice(0, 2)
          .toUpperCase();

        return `
          <article class="testimonial reveal">
            <div class="stars" aria-label="Five star review">★★★★★</div>
            <blockquote>“${escapeHtml(testimonial.quote)}”</blockquote>
            <footer>
              <div class="avatar" aria-hidden="true">${escapeHtml(initials)}</div>
              <span>
                <strong>${escapeHtml(testimonial.name)}</strong>
                <small>${escapeHtml(testimonial.detail)}</small>
              </span>
            </footer>
          </article>
        `;
      })
      .join("");
  };

  const createFaq = () => {
    const container = document.querySelector("#faq-list");

    container.innerHTML = config.faq
      .map(
        (item, index) => `
          <article class="faq-item reveal">
            <h3>
              <button class="faq-question" type="button"
                aria-expanded="false"
                aria-controls="faq-answer-${index}">
                <span>${escapeHtml(item.question)}</span>
                <span aria-hidden="true">+</span>
              </button>
            </h3>
            <div class="faq-answer" id="faq-answer-${index}">
              <div><p>${escapeHtml(item.answer)}</p></div>
            </div>
          </article>
        `
      )
      .join("");

    container.addEventListener("click", (event) => {
      const button = event.target.closest(".faq-question");
      if (!button) return;

      const item = button.closest(".faq-item");
      const isOpen = button.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("is-open");
        faqItem.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  };

  const setupNavigation = () => {
    const header = document.querySelector("#site-header");
    const toggle = document.querySelector("#nav-toggle");
    const nav = document.querySelector("#site-nav");

    const closeNavigation = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      document.body.classList.remove("nav-open");
    };

    toggle.addEventListener("click", () => {
      const willOpen = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
      toggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
      document.body.classList.toggle("nav-open", willOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNavigation();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1020) closeNavigation();
    });

    window.addEventListener(
      "scroll",
      () => header.classList.toggle("is-scrolled", window.scrollY > 12),
      { passive: true }
    );
  };

  const setupEstimateForm = () => {
    const form = document.querySelector("#estimate-form");
    const note = document.querySelector("#form-note");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = formData.get("name");
      const phone = formData.get("phone");
      const service = formData.get("service");

      const subject = encodeURIComponent(
        `${config.business.name} estimate request: ${service}`
      );

      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nService: ${service}\n\nPlease contact me about an estimate.`
      );

      note.textContent = "Opening your email app...";
      window.location.href = `mailto:${config.business.email}?subject=${subject}&body=${body}`;

      window.setTimeout(() => {
        note.textContent = "Demo form: submission opens your email app.";
      }, 2500);
    });
  };

  const setupRevealAnimations = () => {
    const elements = document.querySelectorAll(".reveal");

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  const initialize = () => {
    setTheme();
    setTextContent();
    setBusinessLinks();
    setSeo();

    createHeroPoints();
    createStats();
    createServices();
    createFeatures();
    createProcess();
    createGallery();
    createTestimonials();
    createFaq();

    setupNavigation();
    setupEstimateForm();

    document.querySelector("#current-year").textContent =
      new Date().getFullYear();

    setupRevealAnimations();
  };

  initialize();
})();
