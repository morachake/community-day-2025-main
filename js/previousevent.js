/* JavaScript for Previous Events Showcase Section */
document.addEventListener('DOMContentLoaded', function() {
  // Tab Navigation
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update active tab content
      tabPanes.forEach(pane => pane.classList.remove('active'));
      document.getElementById(targetTab).classList.add('active');
    });
  });
  
  // Speakers Carousel
  let currentSpeakerIndex = 0;
  const speakerProfiles = document.querySelectorAll('.speaker-profile');
  const speakersCarousel = document.querySelector('.speakers-carousel');
  const speakerDots = document.querySelector('.speaker-dots');
  
  // Create dots
  speakerProfiles.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('speaker-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSpeaker(index));
    speakerDots.appendChild(dot);
  });
  
  // Navigation
  document.querySelector('.speaker-prev').addEventListener('click', prevSpeaker);
  document.querySelector('.speaker-next').addEventListener('click', nextSpeaker);
  
  function prevSpeaker() {
    if (currentSpeakerIndex > 0) {
      goToSpeaker(currentSpeakerIndex - 1);
    } else {
      goToSpeaker(speakerProfiles.length - 1);
    }
  }
  
  function nextSpeaker() {
    if (currentSpeakerIndex < speakerProfiles.length - 1) {
      goToSpeaker(currentSpeakerIndex + 1);
    } else {
      goToSpeaker(0);
    }
  }
  
  function goToSpeaker(index) {
    currentSpeakerIndex = index;
    speakersCarousel.scrollLeft = speakerProfiles[index].offsetLeft;
    
    // Update dots
    document.querySelectorAll('.speaker-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Testimonials Slider
  let currentTestimonialIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  const testimonialDots = document.querySelector('.testimonial-dots');
  
  // Create dots
  testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(index));
    testimonialDots.appendChild(dot);
  });
  
  // Navigation
  document.querySelector('.testimonial-prev').addEventListener('click', prevTestimonial);
  document.querySelector('.testimonial-next').addEventListener('click', nextTestimonial);
  
  function prevTestimonial() {
    if (currentTestimonialIndex > 0) {
      showTestimonial(currentTestimonialIndex - 1);
    } else {
      showTestimonial(testimonials.length - 1);
    }
  }
  
  function nextTestimonial() {
    if (currentTestimonialIndex < testimonials.length - 1) {
      showTestimonial(currentTestimonialIndex + 1);
    } else {
      showTestimonial(0);
    }
  }
  
  function showTestimonial(index) {
    currentTestimonialIndex = index;
    
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? 'block' : 'none';
    });
    
    // Update dots
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Initialize testimonials
  showTestimonial(0);
  
  // Video Modal
  const playButton = document.getElementById('event-video-play');
  if (playButton) {
    playButton.addEventListener('click', () => {
      const src = "https://www.youtube.com/embed/xEUwfHzgXiw?si=82hoJiHbfBg855Ea&autoplay=1";
      $("#myModal").modal("show");
      $("#myModal iframe").attr("src", src);
    });
  }
  
  // Auto-rotate testimonials
  setInterval(() => {
    nextTestimonial();
  }, 8000);
  
  // Add scroll reveal animations
  const revealElements = document.querySelectorAll('.event-banner, .event-tabs, .highlight-card, .activity-card, .sponsor-logo, .testimonial, .previous-events-cta');
  
  const scrollReveal = function() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('scroll-revealed');
      }
    });
  };
  
  // Run scroll reveal on page load
  scrollReveal();
  
  // Run scroll reveal on scroll
  window.addEventListener('scroll', scrollReveal);
  
  // Add a CSS class for scroll reveal animations
  const style = document.createElement('style');
  style.textContent = `
    .event-banner, .event-tabs, .highlight-card, .activity-card, .sponsor-logo, .testimonial, .previous-events-cta {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .event-banner.scroll-revealed, 
    .event-tabs.scroll-revealed, 
    .highlight-card.scroll-revealed, 
    .activity-card.scroll-revealed, 
    .sponsor-logo.scroll-revealed, 
    .testimonial.scroll-revealed,
    .previous-events-cta.scroll-revealed {
      opacity: 1;
      transform: translateY(0);
    }
    
    .highlight-card:nth-child(2).scroll-revealed { transition-delay: 0.1s; }
    .highlight-card:nth-child(3).scroll-revealed { transition-delay: 0.2s; }
    .highlight-card:nth-child(4).scroll-revealed { transition-delay: 0.3s; }
    .highlight-card:nth-child(5).scroll-revealed { transition-delay: 0.4s; }
    
    .activity-card:nth-child(2).scroll-revealed { transition-delay: 0.1s; }
    .activity-card:nth-child(3).scroll-revealed { transition-delay: 0.2s; }
    
    .sponsor-logo:nth-child(2).scroll-revealed { transition-delay: 0.05s; }
    .sponsor-logo:nth-child(3).scroll-revealed { transition-delay: 0.1s; }
    .sponsor-logo:nth-child(4).scroll-revealed { transition-delay: 0.15s; }
    .sponsor-logo:nth-child(5).scroll-revealed { transition-delay: 0.2s; }
    .sponsor-logo:nth-child(6).scroll-revealed { transition-delay: 0.25s; }
  `;
  document.head.appendChild(style);
  
  // Gallery Item Clicks - Open larger image view
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Get background image URL
      const bgImage = item.style.backgroundImage.slice(4, -1).replace(/"/g, "");
      
      // Create modal for image
      const modal = document.createElement('div');
      modal.className = 'gallery-modal';
      modal.innerHTML = `
        <div class="gallery-modal-content">
          <span class="gallery-close">&times;</span>
          <img src="${bgImage}" alt="Gallery Image">
        </div>
      `;
      
      // Add modal styles
      const modalStyle = document.createElement('style');
      modalStyle.textContent = `
        .gallery-modal {
          display: block;
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0,0,0,0.9);
          animation: fadeIn 0.3s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .gallery-modal-content {
          margin: 5% auto;
          display: block;
          width: 80%;
          max-width: 900px;
        }
        
        .gallery-modal-content img {
          width: 100%;
          border-radius: 8px;
        }
        
        .gallery-close {
          position: absolute;
          top: 20px;
          right: 30px;
          color: #f1f1f1;
          font-size: 40px;
          font-weight: bold;
          cursor: pointer;
          z-index: 100;
        }
        
        @media (max-width: 768px) {
          .gallery-modal-content {
            width: 95%;
            margin: 15% auto;
          }
        }
      `;
      
      document.head.appendChild(modalStyle);
      document.body.appendChild(modal);
      
      // Close modal functionality
      const closeBtn = modal.querySelector('.gallery-close');
      closeBtn.addEventListener('click', () => {
        modal.remove();
        modalStyle.remove();
      });
      
      // Close by clicking outside the image
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
          modalStyle.remove();
        }
      });
    });
  });
  
  // Add interactive counter animation to stats
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\+|\,/g, ''));
    const suffix = element.textContent.includes('+') ? '+' : '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const useCommas = element.textContent.includes(',');
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for a smoother animation
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(easing * target);
      
      // Format with commas if needed
      const formatted = useCommas ? currentCount.toLocaleString() : currentCount.toString();
      
      element.textContent = formatted + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  // Create an observer for the stats section
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start the animation when stats are in view
        statNumbers.forEach(animateCounter);
        // Disconnect after triggering once
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  // Observe the stats container
  const statsContainer = document.querySelector('.event-stats-row');
  if (statsContainer) {
    statsObserver.observe(statsContainer);
  }
  
  // Initialize tooltips if Bootstrap is available
  if (typeof $.fn.tooltip !== 'undefined') {
    $('[data-toggle="tooltip"]').tooltip();
  }
  
  // Add accessibility features
  tabButtons.forEach(button => {
    button.setAttribute('aria-label', `View ${button.textContent} tab`);
    button.setAttribute('role', 'tab');
  });
  
  document.querySelector('.speaker-prev').setAttribute('aria-label', 'Previous speaker');
  document.querySelector('.speaker-next').setAttribute('aria-label', 'Next speaker');
  document.querySelector('.testimonial-prev').setAttribute('aria-label', 'Previous testimonial');
  document.querySelector('.testimonial-next').setAttribute('aria-label', 'Next testimonial');
  
  // Handle keyboard navigation
  tabButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % tabButtons.length;
        tabButtons[nextIndex].focus();
        tabButtons[nextIndex].click();
      }
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[prevIndex].focus();
        tabButtons[prevIndex].click();
      }
    });
  });
});

// Add a component initialization function
function initializePreviousEventsShowcase() {
  // This function can be called from elsewhere if needed
  console.log('Previous Events Showcase initialized');
  
  // Add any dynamic content loading or additional functionality
  return {
    refreshContent: function() {
      // Method to refresh content
      const tabButtons = document.querySelectorAll('.tab-button');
      if (tabButtons.length > 0) {
        tabButtons[0].click(); // Reset to first tab
      }
      
      console.log('Content refreshed');
    },
    scrollToSection: function(sectionId) {
      // Method to scroll to a specific section
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
}

// Export module if using module system
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initializePreviousEventsShowcase: initializePreviousEventsShowcase
  };
}



/* Additional JavaScript for Smooth Animations */

document.addEventListener('DOMContentLoaded', function() {
  // 1. Add intersection observer for smooth scroll reveals
  const animatedElements = document.querySelectorAll(
    '.event-banner, .event-tabs, .highlights-grid, .speakers-carousel, .activities-showcase, .sponsors-showcase, .testimonials-section, .previous-events-cta'
  );
  
  const appearOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  
  animatedElements.forEach(element => {
    element.classList.add('will-appear');
    appearOnScroll.observe(element);
  });
  
  // 2. Add smooth stagger effect to gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach((item, index) => {
    item.style.animationDelay = `${0.1 * index}s`;
    item.classList.add('gallery-animate');
  });
  
  // 3. Add smooth tab transitions
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      
      // Add prepare-transition class to enable smooth transitions
      tabPanes.forEach(pane => {
        pane.classList.add('prepare-transition');
      });
      
      // Wait a tiny moment before changing tabs for smoother transition
      setTimeout(() => {
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active tab content
        tabPanes.forEach(pane => pane.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
      }, 50);
    });
  });
  
  // 4. Enhance testimonial transitions
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonialIndex = 0;
  
  function showTestimonial(index) {
    // Hide all testimonials first with a fade out
    testimonials.forEach(testimonial => {
      testimonial.style.opacity = 0;
      testimonial.style.transform = 'translateX(20px)';
    });
    
    // After a short delay, show the selected testimonial
    setTimeout(() => {
      testimonials.forEach((testimonial, i) => {
        if (i === index) {
          testimonial.style.display = 'block';
          // Trigger a reflow to ensure the animation works
          void testimonial.offsetWidth;
          // Fade in and slide in from right
          testimonial.style.opacity = 1;
          testimonial.style.transform = 'translateX(0)';
        } else {
          testimonial.style.display = 'none';
        }
      });
      
      // Update dots
      document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      currentTestimonialIndex = index;
    }, 300);
  }
  
  // Initialize testimonials
  testimonials.forEach(testimonial => {
    testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // 5. Add smooth loading animations for images
  const allImages = document.querySelectorAll('.speaker-image img, .activity-image img');
  
  allImages.forEach(img => {
    // Add loading class
    img.classList.add('loading');
    
    // When image loads, remove loading class and add loaded class
    img.onload = function() {
      img.classList.remove('loading');
      img.classList.add('loaded');
    };
    
    // If image is already loaded
    if (img.complete) {
      img.classList.remove('loading');
      img.classList.add('loaded');
    }
  });
  
  // 6. Create a smoother carousel for speakers
  const speakersCarousel = document.querySelector('.speakers-carousel');
  const speakerProfiles = document.querySelectorAll('.speaker-profile');
  
  if (speakersCarousel && speakerProfiles.length > 0) {
    // Make slides fade instead of scroll
    speakerProfiles.forEach(profile => {
      profile.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      profile.style.position = 'absolute';
      profile.style.opacity = 0;
      profile.style.transform = 'translateX(30px)';
      profile.style.pointerEvents = 'none';
    });
    
    // Show first slide
    speakerProfiles[0].style.opacity = 1;
    speakerProfiles[0].style.transform = 'translateX(0)';
    speakerProfiles[0].style.position = 'relative';
    speakerProfiles[0].style.pointerEvents = 'auto';
    
    // Redefine goToSpeaker function for smooth transitions
    window.goToSpeaker = function(index) {
      // First hide current speaker
      speakerProfiles[currentSpeakerIndex].style.opacity = 0;
      speakerProfiles[currentSpeakerIndex].style.transform = 'translateX(-30px)';
      speakerProfiles[currentSpeakerIndex].style.pointerEvents = 'none';
      
      // After a short delay, show the new speaker
      setTimeout(() => {
        speakerProfiles[currentSpeakerIndex].style.position = 'absolute';
        speakerProfiles[index].style.position = 'relative';
        
        // Show new speaker
        speakerProfiles[index].style.opacity = 1;
        speakerProfiles[index].style.transform = 'translateX(0)';
        speakerProfiles[index].style.pointerEvents = 'auto';
        
        // Update dots
        document.querySelectorAll('.speaker-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
        
        currentSpeakerIndex = index;
      }, 300);
    };
  }
  
  // 7. Add CSS variables for dynamic animations
  document.documentElement.style.setProperty('--animate-duration', '0.8s');
  document.documentElement.style.setProperty('--animate-delay', '0.2s');
  
  // 8. Animate numbers with smooth counting
  const countingNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter(element) {
    // Get target number (remove any non-numeric characters)
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.includes('+') ? '+' : '';
    const prefix = element.textContent.includes('$') ? '$' : '';
    
    // Set start and duration
    const start = 0;
    const duration = 2000; // 2 seconds
    
    // Update the count up
    let startTime = null;
    
    function updateCount(timestamp) {
      if (!startTime) startTime = timestamp;
      
      // Calculate progress
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Calculate current count using easeOutExpo for smooth deceleration
      const currentCount = Math.floor(start + (target - start) * (1 - Math.pow(2, -10 * progress)));
      
      // Format with commas for thousands
      const formattedCount = currentCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
      // Update element
      element.textContent = prefix + formattedCount + suffix;
      
      // Continue if not complete
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }
    
    requestAnimationFrame(updateCount);
  }
  
  // Start animation when stats come into view
  const statsSection = document.querySelector('.event-stats-row');
  
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countingNumbers.forEach(animateCounter);
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }
  
  // 9. Add parallax effect to banner background
  const eventBanner = document.querySelector('.event-banner');
  
  if (eventBanner) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const bannerPosition = eventBanner.offsetTop;
      const distance = scrollPosition - bannerPosition;
      
      // Only apply parallax when banner is in view
      if (distance > -window.innerHeight && distance < eventBanner.offsetHeight) {
        eventBanner.style.backgroundPositionY = `${distance * 0.2}px`;
      }
    });
  }
});

// Add CSS classes for the new animations
const animationStyles = `
  /* Preparation classes for animations */
  .will-appear {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .appear {
    opacity: 1;
    transform: translateY(0);
  }
  
  .prepare-transition {
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  
  .gallery-animate {
    opacity: 0;
    animation: fadeInUp 0.5s forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .loading {
    opacity: 0;
  }
  
  .loaded {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;

// Add styles to document
const styleElement = document.createElement('style');
styleElement.textContent = animationStyles;
document.head.appendChild(styleElement);




