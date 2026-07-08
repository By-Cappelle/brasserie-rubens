/**
 * Rubens Knokke - Premium Static Website
 * Cappelle Design Studio
 */

(function () {
 'use strict';

 const header = document.querySelector('.site-header');
 const navToggle = document.querySelector('.nav-toggle');
 const mobileMenu = document.querySelector('.mobile-menu');
 let lastScrollY = 0;
 let ticking = false;

  const headerStartsScrolled = header && header.classList.contains('is-scrolled');

  /* --- Header scroll behavior --- */
  function updateHeader() {
    if (!header) return;
    const scrollY = window.scrollY;

    if (headerStartsScrolled || scrollY > 80) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    if (scrollY > 400 && !headerStartsScrolled) {
      if (scrollY > lastScrollY + 10) {
        header.classList.add('is-hidden');
      } else if (scrollY < lastScrollY - 10) {
        header.classList.remove('is-hidden');
      }
    } else {
      header.classList.remove('is-hidden');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

 if (header) {
 window.addEventListener('scroll', function () {
 if (!ticking) {
 requestAnimationFrame(updateHeader);
 ticking = true;
 }
 }, { passive: true });
 updateHeader();
 }

 /* --- Mobile navigation --- */
 function closeMobileMenu() {
 if (!navToggle || !mobileMenu) return;
 navToggle.classList.remove('is-active');
 mobileMenu.classList.remove('is-open');
 document.body.classList.remove('menu-open');
 navToggle.setAttribute('aria-expanded', 'false');
 }

 if (navToggle && mobileMenu) {
 navToggle.addEventListener('click', function () {
 if (mobileMenu.classList.contains('is-open')) {
 closeMobileMenu();
 } else {
 navToggle.classList.add('is-active');
 mobileMenu.classList.add('is-open');
 document.body.classList.add('menu-open');
 navToggle.setAttribute('aria-expanded', 'true');
 }
 });

 mobileMenu.querySelectorAll('a').forEach(function (link) {
 link.addEventListener('click', closeMobileMenu);
 });

 document.addEventListener('keydown', function (e) {
 if (e.key === 'Escape') closeMobileMenu();
 });
 }

 /* --- Scroll reveal --- */
 const revealElements = document.querySelectorAll('.reveal');

 if (revealElements.length && 'IntersectionObserver' in window) {
 const revealObserver = new IntersectionObserver(
 function (entries) {
 entries.forEach(function (entry) {
 if (entry.isIntersecting) {
 entry.target.classList.add('is-visible');
 revealObserver.unobserve(entry.target);
 }
 });
 },
 { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
 );

 revealElements.forEach(function (el) {
 revealObserver.observe(el);
 });
 } else {
 revealElements.forEach(function (el) {
 el.classList.add('is-visible');
 });
 }

 /* --- History slider --- */
 const historySlider = document.querySelector('.history__slider');

  if (historySlider) {
    const track = historySlider.querySelector('.history__track');
    const slides = historySlider.querySelectorAll('.history__slide');
    const prevBtn = historySlider.querySelector('.history__btn--prev');
    const nextBtn = historySlider.querySelector('.history__btn--next');
    const counter = historySlider.querySelector('.history__counter');
    let currentSlide = 0;
    let autoplayTimer;

    function goToSlide(index) {
      if (!track || !slides.length) return;
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentSlide = index;
      track.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
      if (counter) {
        counter.textContent = String(currentSlide + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      }
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(function () {
        goToSlide(currentSlide + 1);
      }, 6000);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    function resetSlider() {
      goToSlide(0);
      stopAutoplay();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToSlide(currentSlide - 1);
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToSlide(currentSlide + 1);
        startAutoplay();
      });
    }

    historySlider.addEventListener('mouseenter', stopAutoplay);
    historySlider.addEventListener('mouseleave', function () {
      if (historySlider.dataset.isVisible === 'true') startAutoplay();
    });

    resetSlider();

    if ('IntersectionObserver' in window) {
      const historyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            historySlider.dataset.isVisible = 'true';
            startAutoplay();
          } else {
            historySlider.dataset.isVisible = 'false';
            stopAutoplay();
          }
        });
      }, { threshold: 0.35 });

      historyObserver.observe(historySlider);
    }

    window.addEventListener('pageshow', function (event) {
      if (event.persisted) resetSlider();
    });
  }

 /* --- Accordion --- */
 document.querySelectorAll('.accordion__trigger').forEach(function (trigger) {
 trigger.addEventListener('click', function () {
 const item = trigger.closest('.accordion__item');
 const isOpen = item.classList.contains('is-open');
 const accordion = item.closest('.accordion');

 accordion.querySelectorAll('.accordion__item').forEach(function (el) {
 el.classList.remove('is-open');
 el.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
 });

 if (!isOpen) {
 item.classList.add('is-open');
 trigger.setAttribute('aria-expanded', 'true');
 }
 });
 });

 /* --- Sfeer gallery loader --- */
 const sfeerGallery = document.querySelector('[data-sfeer-gallery]');

 function resolveAssetPath(basePath, assetPath) {
 if (/^https?:\/\//.test(assetPath)) {
 return assetPath;
 }
 if (assetPath.charAt(0) === '/') {
 return new URL(assetPath, window.location.origin).href;
 }
 return new URL(assetPath.replace(/^\//, ''), new URL(basePath, window.location.href)).href;
 }

 function renderSfeerGallery(items) {
 items.forEach(function (item) {
 const el = document.createElement('div');
 el.className = 'sfeer-gallery__item';
 el.dataset.full = item.full;
 el.innerHTML = '<img src="' + item.thumb + '" alt="Sfeerbeeld bij Brasserie Rubens" loading="lazy">';
 sfeerGallery.appendChild(el);
 });
 initLightbox(sfeerGallery.querySelectorAll('[data-full]'));
 }

 function probeSfeerImages(jsonPath, items) {
 const results = new Array(items.length);
 let pending = items.length;

 if (!pending) {
 sfeerGallery.innerHTML = '<p class="sfeer-gallery__empty">Geen foto\'s beschikbaar.</p>';
 return;
 }

 items.forEach(function (item, index) {
 const thumb = resolveAssetPath(jsonPath, item.thumb || item.src);
 const full = resolveAssetPath(jsonPath, item.src || item.thumb);
 const probe = new Image();

 function finish() {
 pending -= 1;
 if (pending === 0) {
 const validItems = results.filter(Boolean);
 sfeerGallery.innerHTML = '';
 if (!validItems.length) {
 sfeerGallery.innerHTML = '<p class="sfeer-gallery__empty">Geen foto\'s beschikbaar.</p>';
 return;
 }
 renderSfeerGallery(validItems);
 }
 }

 probe.onload = function () {
 results[index] = { thumb: thumb, full: full };
 finish();
 };

 probe.onerror = function () {
 results[index] = null;
 finish();
 };

 probe.src = thumb;
 });
 }

 if (sfeerGallery) {
 const jsonPath = sfeerGallery.dataset.sfeerGallery;
 fetch(jsonPath)
 .then(function (res) {
 if (!res.ok) throw new Error('fetch failed');
 return res.json();
 })
 .then(function (items) {
 probeSfeerImages(jsonPath, items);
 })
 .catch(function () {
 sfeerGallery.innerHTML = '<p class="sfeer-gallery__empty">Galerij kon niet geladen worden.</p>';
 });
 }

 function initReveal(els) {
 if (!els.length || !('IntersectionObserver' in window)) return;
 const obs = new IntersectionObserver(function (entries) {
 entries.forEach(function (entry) {
 if (entry.isIntersecting) {
 entry.target.classList.add('is-visible');
 obs.unobserve(entry.target);
 }
 });
 }, { threshold: 0.1 });
 els.forEach(function (el) { obs.observe(el); });
 }

 /* --- Gallery lightbox --- */
 function initLightbox(items) {
 if (!items.length) return;

 let lightbox = document.querySelector('.lightbox');
 if (!lightbox) {
 lightbox = document.createElement('div');
 lightbox.className = 'lightbox';
 lightbox.innerHTML = '<button class="lightbox__close" aria-label="Sluiten">Sluiten</button><img src="" alt="">';
 document.body.appendChild(lightbox);
 }

 const lightboxImg = lightbox.querySelector('img');
 const lightboxClose = lightbox.querySelector('.lightbox__close');

 function openLightbox(src, alt) {
 lightboxImg.src = src;
 lightboxImg.alt = alt || '';
 lightbox.classList.add('is-open');
 document.body.style.overflow = 'hidden';
 }

 function closeLightbox() {
 lightbox.classList.remove('is-open');
 document.body.style.overflow = '';
 lightboxImg.src = '';
 }

 items.forEach(function (item) {
 item.addEventListener('click', function () {
 const img = item.querySelector('img');
 openLightbox(item.dataset.full || img.src, img ? img.alt : '');
 });
 });

 lightboxClose.addEventListener('click', closeLightbox);
 lightbox.addEventListener('click', function (e) {
 if (e.target === lightbox) closeLightbox();
 });

 document.addEventListener('keydown', function (e) {
 if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
 closeLightbox();
 }
 });
 }

 initLightbox(document.querySelectorAll('.gallery-item[data-full], .postcard-card[data-full]'));

 document.querySelectorAll('.gallery-item img, .sfeer-gallery__item img').forEach(function (img) {
 img.addEventListener('error', function () {
 const item = img.closest('.gallery-item, .sfeer-gallery__item');
 if (item) item.remove();
 });
 });

 /* --- Smooth scroll for same-page anchors --- */
 document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
 anchor.addEventListener('click', function (e) {
 const targetId = this.getAttribute('href');
 if (targetId === '#') return;
 const target = document.querySelector(targetId);
 if (!target) return;
 e.preventDefault();
 const offset = header ? header.offsetHeight : 0;
 window.scrollTo({
 top: target.getBoundingClientRect().top + window.scrollY - offset,
 behavior: 'smooth'
 });
 });
 });
})();
