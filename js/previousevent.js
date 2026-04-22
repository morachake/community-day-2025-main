/* JavaScript for Previous Events Showcase Section */
document.addEventListener('DOMContentLoaded', function () {
  const showcase = document.querySelector('.previous-events-showcase');
  if (!showcase) {
    return;
  }

  hydrate2025SpeakerGrid(showcase);
  initYearSelector(showcase);

  const panels = showcase.querySelectorAll('.previous-event-panel');
  panels.forEach(initPanel);

});

function initYearSelector(showcase) {
  const tabList = showcase.querySelector('.previous-events-selector');
  const yearCards = Array.from(showcase.querySelectorAll('.event-year-card'));
  const panels = Array.from(showcase.querySelectorAll('.previous-event-panel'));

  if (!tabList || !yearCards.length || !panels.length) {
    return;
  }

  const getPanelForCard = function (card) {
    const controls = card.getAttribute('aria-controls');
    return controls ? showcase.querySelector('#' + controls) : null;
  };

  const activateCard = function (targetCard, options) {
    const settings = options || {};
    const targetPanel = getPanelForCard(targetCard);

    if (!targetCard || !targetPanel) {
      return;
    }

    yearCards.forEach(function (card) {
      const isActive = card === targetCard;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-selected', isActive ? 'true' : 'false');
      card.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panels.forEach(function (panel) {
      const isActive = panel === targetPanel;
      panel.classList.toggle('active', isActive);
      panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      panel.classList.toggle('panel-animate-once', isActive && panel.dataset.hasAnimated !== 'true');

      if (isActive) {
        panel.removeAttribute('hidden');
        panel.dataset.hasAnimated = 'true';
      } else {
        panel.setAttribute('hidden', 'hidden');
      }
    });

    showcase.setAttribute('data-active-event-year', targetCard.dataset.eventYear || '');

    const activeCarousel = targetPanel.querySelector('.speakers-carousel');
    if (activeCarousel) {
      window.requestAnimationFrame(function () {
        activeCarousel.dispatchEvent(new CustomEvent('speaker-carousel:refresh'));
      });
    }

    if (settings.focus) {
      targetCard.focus({ preventScroll: true });
    }
  };

  tabList.addEventListener('click', function (event) {
    const clickedCard = event.target.closest('.event-year-card');

    if (!clickedCard || !tabList.contains(clickedCard)) {
      return;
    }

    event.preventDefault();
    activateCard(clickedCard);
  });

  yearCards.forEach(function (card) {
    card.addEventListener('keydown', function (event) {
      if (
        event.key !== 'ArrowRight' &&
        event.key !== 'ArrowLeft' &&
        event.key !== 'ArrowDown' &&
        event.key !== 'ArrowUp' &&
        event.key !== 'Home' &&
        event.key !== 'End' &&
        event.key !== 'Enter' &&
        event.key !== ' '
      ) {
        return;
      }

      event.preventDefault();

      if (event.key === 'Enter' || event.key === ' ') {
        activateCard(card);
        return;
      }

      if (event.key === 'Home') {
        activateCard(yearCards[0], { focus: true });
        return;
      }

      if (event.key === 'End') {
        activateCard(yearCards[yearCards.length - 1], { focus: true });
        return;
      }

      const currentIndex = yearCards.indexOf(card);
      const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (currentIndex + direction + yearCards.length) % yearCards.length;

      activateCard(yearCards[nextIndex], { focus: true });
    });
  });

  const activeCard = yearCards.find(function (card) {
    return card.classList.contains('active');
  });

  activateCard(activeCard || yearCards[0]);
}

function initPanel(panel) {
  initSpeakerCarousel(panel);
  initTestimonials(panel);
  initVideoPreview(panel);
  initGalleryModal(panel);
  initCounterAnimation(panel);
  initImageState(panel);
}

function initSpeakerCarousel(panel) {
  const carousel = panel.querySelector('.speakers-carousel');
  const prevButton = panel.querySelector('.speaker-prev');
  const nextButton = panel.querySelector('.speaker-next');
  const dotsContainer = panel.querySelector('.speaker-dots');
  const isHighlightCarousel = carousel ? carousel.dataset.speakersMode === 'highlight' : false;
  const scrollViewport = isHighlightCarousel ? panel.querySelector('.speaker-grid-viewport') : carousel;
  const slides = carousel ? Array.from(carousel.querySelectorAll('.speaker-profile, .previous-event-speaker-card')) : [];
  const mobilePaginationQuery = window.matchMedia('(max-width: 768px)');
  const navigation = dotsContainer ? dotsContainer.parentElement : null;
  const fractionIndicator = isHighlightCarousel ? document.createElement('div') : null;

  if (!carousel || !scrollViewport || !slides.length || !prevButton || !nextButton || !dotsContainer) {
    return;
  }

  let currentIndex = 0;
  let currentPage = 0;
  let resizeFrame = 0;

  dotsContainer.innerHTML = '';

  if (isHighlightCarousel && navigation && fractionIndicator) {
    navigation.classList.add('highlight-pagination');
    fractionIndicator.className = 'carousel-fraction';
    fractionIndicator.setAttribute('aria-live', 'polite');
    fractionIndicator.setAttribute('aria-atomic', 'true');
  }

  const getSlidesPerView = function () {
    if (!isHighlightCarousel) {
      return 1;
    }

    if (mobilePaginationQuery.matches) {
      return 1;
    }

    if (window.innerWidth <= 1199) {
      return 2;
    }

    return 4;
  };

  const scrollToSlide = function (index, behavior) {
    const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
    const target = slides[safeIndex];

    if (!target) {
      return;
    }

    if (isHighlightCarousel) {
      const viewportRect = scrollViewport.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const left = scrollViewport.scrollLeft + (targetRect.left - viewportRect.left);

      scrollViewport.scrollTo({
        left: left,
        behavior: behavior || 'smooth'
      });
      return;
    }

    scrollViewport.scrollTo({
      left: target.offsetLeft,
      behavior: behavior || 'smooth'
    });
  };

  const updateActiveDot = function (activeIndex) {
    Array.from(dotsContainer.querySelectorAll('.speaker-dot')).forEach(function (dot, dotIndex) {
      dot.classList.toggle('active', dotIndex === activeIndex);
    });
  };

  const renderDots = function (count, labelPrefix, clickHandler) {
    dotsContainer.innerHTML = '';

    for (let index = 0; index < count; index += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'speaker-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', labelPrefix + ' ' + (index + 1));
      dot.addEventListener('click', function () {
        clickHandler(index);
      });
      dotsContainer.appendChild(dot);
    }
  };

  const renderHighlightPagination = function (count) {
    const useFractionPagination = mobilePaginationQuery.matches;

    dotsContainer.classList.toggle('is-fraction', useFractionPagination);

    if (useFractionPagination && fractionIndicator) {
      dotsContainer.innerHTML = '';
      fractionIndicator.textContent = (currentPage + 1) + ' / ' + count;
      dotsContainer.appendChild(fractionIndicator);
      return;
    }

    renderDots(count, 'View speaker group', function (pageIndex) {
      goToPage(pageIndex);
    });
    updateActiveDot(currentPage);
  };

  const refreshStandardCarousel = function (behavior) {
    scrollToSlide(currentIndex, behavior || 'auto');
    updateActiveDot(currentIndex);
    prevButton.disabled = false;
    nextButton.disabled = false;
  };

  const refreshHighlightCarousel = function (behavior) {
    const slidesPerView = getSlidesPerView();
    const pageCount = Math.max(1, Math.ceil(slides.length / slidesPerView));

    scrollViewport.style.setProperty('--speaker-cards-per-view', String(slidesPerView));
    currentPage = Math.max(0, Math.min(Math.floor(currentIndex / slidesPerView), pageCount - 1));
    currentIndex = currentPage * slidesPerView;

    renderHighlightPagination(pageCount);
    scrollToSlide(currentIndex, behavior || 'auto');
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pageCount - 1;
  };

  const goToSpeaker = function (index) {
    currentIndex = (index + slides.length) % slides.length;
    refreshStandardCarousel('smooth');
  };

  const goToPage = function (page) {
    const slidesPerView = getSlidesPerView();
    const pageCount = Math.max(1, Math.ceil(slides.length / slidesPerView));
    currentPage = Math.max(0, Math.min(page, pageCount - 1));
    currentIndex = currentPage * slidesPerView;
    refreshHighlightCarousel('smooth');
  };

  prevButton.setAttribute('aria-label', 'Previous speaker');
  nextButton.setAttribute('aria-label', 'Next speaker');

  if (isHighlightCarousel) {
    prevButton.addEventListener('click', function () {
      goToPage(currentPage - 1);
    });

    nextButton.addEventListener('click', function () {
      goToPage(currentPage + 1);
    });

    const refreshCarousel = function (behavior) {
      refreshHighlightCarousel(behavior);
    };

    carousel.addEventListener('speaker-carousel:refresh', function () {
      refreshCarousel('auto');
    });

    window.addEventListener('resize', function () {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(function () {
        refreshCarousel('auto');
      });
    });

    refreshCarousel('auto');
    return;
  }

  renderDots(slides.length, 'View speaker', function (index) {
    goToSpeaker(index);
  });

  prevButton.addEventListener('click', function () {
    goToSpeaker(currentIndex - 1);
  });

  nextButton.addEventListener('click', function () {
    goToSpeaker(currentIndex + 1);
  });

  carousel.addEventListener('speaker-carousel:refresh', function () {
    refreshStandardCarousel('auto');
  });

  refreshStandardCarousel('auto');
}

function initTestimonials(panel) {
  const testimonials = Array.from(panel.querySelectorAll('.testimonial'));
  const dotsContainer = panel.querySelector('.testimonial-dots');
  const prevButton = panel.querySelector('.testimonial-prev');
  const nextButton = panel.querySelector('.testimonial-next');

  if (!testimonials.length || !dotsContainer || !prevButton || !nextButton) {
    return;
  }

  let currentIndex = 0;

  const showTestimonial = function (index) {
    currentIndex = (index + testimonials.length) % testimonials.length;

    testimonials.forEach(function (testimonial, testimonialIndex) {
      testimonial.style.display = testimonialIndex === currentIndex ? 'block' : 'none';
      testimonial.style.opacity = testimonialIndex === currentIndex ? '1' : '0';
      testimonial.style.transform = testimonialIndex === currentIndex ? 'translateX(0)' : 'translateX(20px)';
    });

    Array.from(dotsContainer.querySelectorAll('.testimonial-dot')).forEach(function (dot, dotIndex) {
      dot.classList.toggle('active', dotIndex === currentIndex);
    });
  };

  testimonials.forEach(function (_, index) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'testimonial-dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'View attendee testimonial ' + (index + 1));
    dot.addEventListener('click', function () {
      showTestimonial(index);
    });
    dotsContainer.appendChild(dot);
  });

  prevButton.setAttribute('aria-label', 'Previous testimonial');
  nextButton.setAttribute('aria-label', 'Next testimonial');

  prevButton.addEventListener('click', function () {
    showTestimonial(currentIndex - 1);
  });

  nextButton.addEventListener('click', function () {
    showTestimonial(currentIndex + 1);
  });

  testimonials.forEach(function (testimonial) {
    testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  showTestimonial(0);

  window.setInterval(function () {
    showTestimonial(currentIndex + 1);
  }, 8000);
}

function initVideoPreview(panel) {
  const videoButtons = panel.querySelectorAll('.event-video-play');
  if (!videoButtons.length) {
    return;
  }

  videoButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const src = 'https://www.youtube.com/embed/xEUwfHzgXiw?si=82hoJiHbfBg855Ea&autoplay=1';
      $('#myModal').modal('show');
      $('#myModal iframe').attr('src', src);
    });
  });
}

function initGalleryModal(panel) {
  const galleryItems = panel.querySelectorAll('.gallery-item');

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const backgroundImage = item.style.backgroundImage.slice(4, -1).replace(/"/g, '');
      const modal = document.createElement('div');
      const modalStyle = document.createElement('style');

      modal.className = 'gallery-modal';
      modal.innerHTML = [
        '<div class="gallery-modal-content">',
        '<span class="gallery-close">&times;</span>',
        '<img src="' + backgroundImage + '" alt="Gallery Image">',
        '</div>'
      ].join('');

      modalStyle.textContent = [
        '.gallery-modal {',
        '  display: block;',
        '  position: fixed;',
        '  z-index: 9999;',
        '  inset: 0;',
        '  background-color: rgba(0,0,0,0.9);',
        '}',
        '.gallery-modal-content {',
        '  margin: 5% auto;',
        '  display: block;',
        '  width: 80%;',
        '  max-width: 900px;',
        '}',
        '.gallery-modal-content img {',
        '  width: 100%;',
        '  border-radius: 8px;',
        '}',
        '.gallery-close {',
        '  position: absolute;',
        '  top: 20px;',
        '  right: 30px;',
        '  color: #f1f1f1;',
        '  font-size: 40px;',
        '  font-weight: bold;',
        '  cursor: pointer;',
        '  z-index: 100;',
        '}',
        '@media (max-width: 768px) {',
        '  .gallery-modal-content { width: 95%; margin: 15% auto; }',
        '}'
      ].join('\n');

      document.head.appendChild(modalStyle);
      document.body.appendChild(modal);

      const closeModal = function () {
        modal.remove();
        modalStyle.remove();
      };

      modal.querySelector('.gallery-close').addEventListener('click', closeModal);
      modal.addEventListener('click', function (event) {
        if (event.target === modal) {
          closeModal();
        }
      });
    });
  });
}

function initCounterAnimation(panel) {
  const statNumbers = Array.from(panel.querySelectorAll('.stat-number'));
  const statsContainer = panel.querySelector('.event-stats-row');

  if (!statNumbers.length || !statsContainer) {
    return;
  }

  const animateCounter = function (element) {
    if (element.dataset.animated === 'true') {
      return;
    }

    element.dataset.animated = 'true';

    const target = parseInt(element.textContent.replace(/\+|,/g, ''), 10);
    const suffix = element.textContent.includes('+') ? '+' : '';
    const useCommas = element.textContent.includes(',');
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = function (currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easing * target);
      const formatted = useCommas ? currentCount.toLocaleString() : currentCount.toString();

      element.textContent = formatted + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver(function (entries, statsObserver) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }

      statNumbers.forEach(animateCounter);
      statsObserver.disconnect();
    });
  }, { threshold: 0.5 });

  observer.observe(statsContainer);
}

function initImageState(panel) {
  const images = panel.querySelectorAll('.speaker-image img, .activity-image img, .previous-event-speaker-image img');

  images.forEach(function (img) {
    if (img.complete) {
      img.classList.add('loaded');
      return;
    }

    img.addEventListener('load', function () {
      img.classList.add('loaded');
    }, { once: true });
  });
}

function hydrate2025SpeakerGrid(showcase) {
  const container = showcase.querySelector('[data-speaker-source="2025-lineup"]');
  if (!container) {
    return;
  }

  const sources = Array.from(document.querySelectorAll('#speakers-2025-lineup-source .confirmed-speaker-card, #speakers-2025-lineup-source .desktop-only .speaker-card'));
  const seenNames = new Set();

  container.innerHTML = '';

  sources.forEach(function (source) {
    const speakerData = getSpeakerData(source);
    if (!speakerData || seenNames.has(speakerData.name)) {
      return;
    }

    seenNames.add(speakerData.name);
    container.appendChild(buildSpeakerCard(speakerData));
  });
}

function getSpeakerData(source) {
  if (source.classList.contains('confirmed-speaker-card')) {
    const image = source.querySelector('.primary-photo img');
    const name = source.querySelector('.speaker-info h3');
    const role = source.querySelector('.speaker-title');
    const summary = source.querySelector('.speaker-bio p');

    if (!image || !name || !role) {
      return null;
    }

    return {
      image: image.src,
      alt: image.alt || name.textContent.trim(),
      badge: 'Keynote',
      name: name.textContent.trim(),
      role: role.textContent.trim(),
      meta: '',
      summary: summary ? summary.textContent.trim() : ''
    };
  }

  const image = source.querySelector('.speaker-avatar img');
  const name = source.querySelector('h4');
  const role = source.querySelector('.speaker-position');
  const meta = source.querySelector('.speaker-company');
  const summary = source.querySelector('.speaker-bio-short');
  const badge = source.querySelector('.track-badge');

  if (!image || !name || !role) {
    return null;
  }

  return {
    image: image.src,
    alt: image.alt || name.textContent.trim(),
    badge: badge ? badge.textContent.trim() : 'Speaker',
    name: name.textContent.trim(),
    role: role.textContent.trim(),
    meta: meta ? meta.textContent.trim() : '',
    summary: summary ? summary.textContent.trim() : ''
  };
}

function buildSpeakerCard(speaker) {
  const card = document.createElement('article');
  const imageWrap = document.createElement('div');
  const image = document.createElement('img');
  const badge = document.createElement('span');
  const content = document.createElement('div');
  const name = document.createElement('h4');
  const role = document.createElement('p');
  const meta = document.createElement('p');
  const summary = document.createElement('p');

  card.className = 'previous-event-speaker-card speaker-carousel-slide';
  imageWrap.className = 'previous-event-speaker-image';
  badge.className = 'previous-event-speaker-badge';
  content.className = 'previous-event-speaker-content';
  role.className = 'previous-event-speaker-role';
  meta.className = 'previous-event-speaker-meta';
  summary.className = 'previous-event-speaker-summary';

  image.src = speaker.image;
  image.alt = speaker.alt;
  badge.textContent = speaker.badge;
  name.textContent = speaker.name;
  role.textContent = speaker.role;
  meta.textContent = speaker.meta;
  summary.textContent = speaker.summary;

  imageWrap.appendChild(image);
  imageWrap.appendChild(badge);
  content.appendChild(name);
  content.appendChild(role);
  if (speaker.meta) {
    content.appendChild(meta);
  }
  if (speaker.summary) {
    content.appendChild(summary);
  }

  card.appendChild(imageWrap);
  card.appendChild(content);

  return card;
}

function initRevealAnimations(showcase) {
  const animatedElements = showcase.querySelectorAll(
    '.history-switcher-card, .event-year-card, .previous-events-detail'
  );

  const observer = new IntersectionObserver(function (entries, revealObserver) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('scroll-revealed');
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  });

  animatedElements.forEach(function (element) {
    observer.observe(element);
  });
}
