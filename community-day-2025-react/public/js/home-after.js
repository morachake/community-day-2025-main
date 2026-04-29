/* Ported from legacy index.html inline scripts (UTM + countdown + hover + mobile carousels). */
(function () {
  if (typeof window.jQuery !== "undefined") {
    window.jQuery(document).ready(function ($) {
      $(".buy-ticket-link").on("click", () => {
        checkForUtmAvilableOrNot(decodeURIComponent(location.href))
          .then((formResolve) => {
            window.open("https://gig.co.ke/event/gev_979/ticket?" + formResolve, "_blank");
          })
          .catch(() => {
            window.open("https://gig.co.ke/event/gev_979/ticket", "_blank");
          });
      });

      function checkForUtmAvilableOrNot(_currentUrl) {
        return new Promise((resolve, reject) => {
          if (_currentUrl.indexOf("utm_source") > -1) {
            let qp = _currentUrl.slice(_currentUrl.indexOf("?") + 1);
            let a = qp.split("&");
            let _utmPara = "";
            a.forEach((v, j) => {
              try {
                if (j > 2) return;
                let _utm = checkForSpecialChar(v);
                _utmPara += _utm == 1 ? (j == 2 ? v : v + "&") : v.slice(0, _utm);
              } catch (err) {
                console.error(err);
              }
            });
            resolve(_utmPara);
          } else {
            reject(0);
          }
        });
      }

      let specialChars = "<>@!#$?%^&*()+[]{}:;|'\"\\,./~`-";
      function checkForSpecialChar(string) {
        let _indexOf = string.length;
        for (let i = 0; i < specialChars.length; i++) {
          if (string.indexOf(specialChars[i]) > -1) {
            _indexOf =
              _indexOf > string.indexOf(specialChars[i])
                ? string.indexOf(specialChars[i])
                : _indexOf;
          }
        }
        return _indexOf != string.length ? _indexOf : 1;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const lineupRoot = document.getElementById("speakers-2025-lineup-source");
    const speakerCard = lineupRoot ? lineupRoot.querySelector(".confirmed-speaker-card") : null;
    const primaryPhoto = lineupRoot ? lineupRoot.querySelector(".primary-photo") : null;
    const secondaryPhoto = lineupRoot ? lineupRoot.querySelector(".secondary-photo") : null;

    if (speakerCard && primaryPhoto && secondaryPhoto) {
      speakerCard.addEventListener("mouseenter", function () {
        primaryPhoto.classList.add("hover");
        secondaryPhoto.classList.add("hover");
      });

      speakerCard.addEventListener("mouseleave", function () {
        primaryPhoto.classList.remove("hover");
        secondaryPhoto.classList.remove("hover");
      });
    }

    document.querySelectorAll(".hover-scale").forEach((element) => {
      element.addEventListener("mouseenter", function () {
        this.classList.add("hover");
      });
      element.addEventListener("mouseleave", function () {
        this.classList.remove("hover");
      });
    });

    document.querySelectorAll(".hover-lift").forEach((element) => {
      element.addEventListener("mouseenter", function () {
        this.classList.add("hover");
      });
      element.addEventListener("mouseleave", function () {
        this.classList.remove("hover");
      });
    });

    const wernerSection = document.getElementById("werner-vogels-keynote");
    const cursorGradient = document.querySelector(".cursor-gradient-option2");

    if (wernerSection && cursorGradient) {
      wernerSection.addEventListener("mouseenter", function () {
        cursorGradient.style.opacity = "1";
      });

      wernerSection.addEventListener("mouseleave", function () {
        cursorGradient.style.opacity = "0";
      });

      wernerSection.addEventListener("mousemove", function (e) {
        const rect = wernerSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        requestAnimationFrame(function () {
          cursorGradient.style.left = x + "px";
          cursorGradient.style.top = y + "px";
        });
      });
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    function initMobileCarousels() {
      if (window.innerWidth <= 768) {
        initCarousel("volunteers-carousel");
        initCarousel("organizers-carousel");
        initCarousel("speakers-carousel");
      }
    }

    function initCarousel(carouselId) {
      const carousel = document.getElementById(carouselId);
      if (!carousel) return;

      const track = carousel.querySelector(".carousel-track");
      if (!track) return;

      const slides = Array.from(track.children);
      const prevButton = carousel.querySelector(".carousel-btn-prev");
      const nextButton = carousel.querySelector(".carousel-btn-next");
      const currentSlideSpan = carousel.querySelector(".current-slide");
      const totalSlidesSpan = carousel.querySelector(".total-slides");

      let currentSlide = 0;
      let slidesPerView = 2;
      if (carouselId === "speakers-carousel") {
        slidesPerView = 1;
      }

      const maxSlides = Math.ceil(slides.length / slidesPerView);

      if (totalSlidesSpan) {
        totalSlidesSpan.textContent = maxSlides;
      }

      function updateCarousel() {
        const translateX = -currentSlide * (200 / slidesPerView);
        track.style.transform = "translateX(" + translateX + "%)";

        if (prevButton) {
          prevButton.disabled = currentSlide === 0;
          prevButton.style.opacity = currentSlide === 0 ? "0.5" : "1";
        }
        if (nextButton) {
          nextButton.disabled = currentSlide >= maxSlides - 1;
          nextButton.style.opacity = currentSlide >= maxSlides - 1 ? "0.5" : "1";
        }
        if (currentSlideSpan) {
          currentSlideSpan.textContent = currentSlide + 1;
        }
      }

      function nextSlide() {
        if (currentSlide < maxSlides - 1) {
          currentSlide++;
          updateCarousel();
        }
      }

      function prevSlide() {
        if (currentSlide > 0) {
          currentSlide--;
          updateCarousel();
        }
      }

      if (prevButton) prevButton.addEventListener("click", prevSlide);
      if (nextButton) nextButton.addEventListener("click", nextSlide);

      let startX = 0;
      let isDragging = false;

      track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      });

      track.addEventListener(
        "touchmove",
        (e) => {
          if (!isDragging) return;
          e.preventDefault();
        },
        { passive: false }
      );

      track.addEventListener("touchend", (e) => {
        if (!isDragging) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }

        isDragging = false;
      });

      updateCarousel();
    }

    initMobileCarousels();

    window.addEventListener("resize", function () {
      setTimeout(initMobileCarousels, 100);
    });
  });
})();
