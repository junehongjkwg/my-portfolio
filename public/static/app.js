// ============================================================================
// JUNE HONG Portfolio — Interaction Layer
// Custom cursor, intro loader, scroll reveal, smooth scroll easing,
// category filter, mobile nav, and lightbox.
// ============================================================================
;(function () {
  'use strict'

  var isTouch = window.matchMedia('(max-width: 860px)').matches

  // -------------------------------------------------------------------------
  // Intro loader
  // -------------------------------------------------------------------------
  function initLoader() {
    var veil = document.querySelector('.loader-veil')
    if (!veil) return
    window.setTimeout(function () {
      veil.classList.add('is-hidden')
    }, 900)
  }

  // -------------------------------------------------------------------------
  // Custom cursor (dot + lagging ring), disabled on touch
  // -------------------------------------------------------------------------
  function initCursor() {
    if (isTouch) return
    var dot = document.createElement('div')
    dot.className = 'cursor-dot'
    var ring = document.createElement('div')
    ring.className = 'cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    var mouseX = window.innerWidth / 2
    var mouseY = window.innerHeight / 2
    var ringX = mouseX
    var ringY = mouseY

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px) translate(-50%,-50%)'
    })

    function raf() {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px) translate(-50%,-50%)'
      window.requestAnimationFrame(raf)
    }
    window.requestAnimationFrame(raf)

    var hoverTargets = document.querySelectorAll('a, button, .project-card, .filter-pill, [data-cursor]')
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        ring.classList.add('is-hover')
        var label = el.getAttribute('data-cursor')
        if (label) {
          ring.classList.add('is-text')
          ring.setAttribute('data-label', label)
        }
      })
      el.addEventListener('mouseleave', function () {
        ring.classList.remove('is-hover')
        ring.classList.remove('is-text')
        ring.removeAttribute('data-label')
      })
    })
  }

  // -------------------------------------------------------------------------
  // Scroll reveal
  // -------------------------------------------------------------------------
  function initReveal() {
    var items = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window) || items.length === 0) {
      items.forEach(function (el) { el.classList.add('is-visible') })
      return
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    items.forEach(function (el) { observer.observe(el) })
  }

  // -------------------------------------------------------------------------
  // Skill bar fill animation
  // -------------------------------------------------------------------------
  function initSkillBars() {
    var bars = document.querySelectorAll('.skill-fill')
    if (bars.length === 0) return
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target
            var level = el.getAttribute('data-level') || '0'
            el.style.width = level + '%'
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.4 }
    )
    bars.forEach(function (el) { observer.observe(el) })
  }

  // -------------------------------------------------------------------------
  // Mobile nav toggle
  // -------------------------------------------------------------------------
  function initNavToggle() {
    var toggle = document.querySelector('.nav-toggle')
    var nav = document.querySelector('.main-nav')
    if (!toggle || !nav) return
    toggle.addEventListener('click', function () {
      var open = nav.style.display === 'flex'
      nav.style.display = open ? 'none' : 'flex'
      nav.style.flexDirection = 'column'
      nav.style.position = 'fixed'
      nav.style.top = '64px'
      nav.style.right = '20px'
      nav.style.background = '#111'
      nav.style.border = '1px solid rgba(255,255,255,0.12)'
      nav.style.padding = '16px 24px'
      nav.style.gap = '16px'
      nav.style.zIndex = '200'
      toggle.textContent = open ? 'MENU' : 'CLOSE'
    })
  }

  // -------------------------------------------------------------------------
  // Category filter (video / photo listing pages)
  // -------------------------------------------------------------------------
  function initFilter() {
    var rail = document.querySelector('.filter-rail')
    if (!rail) return
    var pills = rail.querySelectorAll('.filter-pill')
    var cards = document.querySelectorAll('[data-category]')

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('is-active') })
        pill.classList.add('is-active')
        var target = pill.getAttribute('data-filter')
        cards.forEach(function (card) {
          if (target === 'all' || card.getAttribute('data-category') === target) {
            card.style.display = ''
          } else {
            card.style.display = 'none'
          }
        })
      })
    })
  }

  // -------------------------------------------------------------------------
  // Lightbox for photo grids
  // -------------------------------------------------------------------------
  function initLightbox() {
    var lightbox = document.querySelector('.lightbox')
    if (!lightbox) return
    var img = lightbox.querySelector('img')
    var closeBtn = lightbox.querySelector('.lightbox-close')
    var triggers = document.querySelectorAll('[data-lightbox]')

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault()
        img.setAttribute('src', trigger.getAttribute('data-lightbox'))
        lightbox.classList.add('is-open')
      })
    })

    function closeLightbox() {
      lightbox.classList.remove('is-open')
      img.setAttribute('src', '')
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox)
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox()
    })
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox()
    })
  }

  // -------------------------------------------------------------------------
  // Header shrink on scroll (subtle)
  // -------------------------------------------------------------------------
  function initHeaderScroll() {
    var header = document.querySelector('.site-header')
    if (!header) return
    var lastY = 0
    window.addEventListener('scroll', function () {
      var y = window.scrollY
      if (y > 40) {
        header.style.background = 'rgba(10,10,10,0.85)'
        header.style.backdropFilter = 'blur(8px)'
      } else {
        header.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.9), transparent)'
        header.style.backdropFilter = 'none'
      }
      lastY = y
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLoader()
    initCursor()
    initReveal()
    initSkillBars()
    initNavToggle()
    initFilter()
    initLightbox()
    initHeaderScroll()
  })
})()
