(function () {
  "use strict";

  // Scroll to top button
  var scrollToTopBtn = document.getElementById("scroll-to-top");
  if (scrollToTopBtn) {
    function updateScrollToTop() {
      var scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (scrollY > 200) {
        scrollToTopBtn.classList.remove("opacity-0", "pointer-events-none");
        scrollToTopBtn.style.opacity = "1";
        scrollToTopBtn.style.pointerEvents = "auto";
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.classList.add("opacity-0", "pointer-events-none");
        scrollToTopBtn.style.opacity = "0";
        scrollToTopBtn.style.pointerEvents = "none";
      }
    }

    // Ensure button exists and is ready
    scrollToTopBtn.style.display = "block";
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.pointerEvents = "none";

    // Support both scroll and touchmove events for mobile
    window.addEventListener("scroll", updateScrollToTop, { passive: true });
    window.addEventListener("touchmove", updateScrollToTop, { passive: true });

    // Also listen on window resize for mobile orientation changes
    window.addEventListener("resize", updateScrollToTop, { passive: true });

    updateScrollToTop();

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    scrollToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      scrollToTop();
    });

    // Also support touch events explicitly for mobile
    scrollToTopBtn.addEventListener("touchend", function (e) {
      e.preventDefault();
      e.stopPropagation();
      scrollToTop();
    });
  }

  // Footer year
  var yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Gallery lightbox
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.getElementById("lightbox-close");
  var galleryItems = document.querySelectorAll(".gallery-item");

  function openLightbox(src) {
    if (lightbox && lightboxImg) {
      lightboxImg.src = src;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var src = item.getAttribute("data-src");
      if (src) openLightbox(src);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", function (e) {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      lightbox &&
      lightbox.classList.contains("is-open")
    ) {
      closeLightbox();
    }
  });
})();
