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
  // Magnetic elements — nav links / CTA pills pull slightly toward cursor
  // -------------------------------------------------------------------------
  function initMagnetic() {
    if (isTouch) return
    var els = document.querySelectorAll('[data-magnetic]')
    els.forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-magnetic')) || 0.35
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect()
        var relX = e.clientX - (rect.left + rect.width / 2)
        var relY = e.clientY - (rect.top + rect.height / 2)
        el.style.setProperty('--mx', (relX * strength).toFixed(1) + 'px')
        el.style.setProperty('--my', (relY * strength).toFixed(1) + 'px')
      })
      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--mx', '0px')
        el.style.setProperty('--my', '0px')
      })
    })
  }

  // -------------------------------------------------------------------------
  // Parallax backgrounds (hero split-tiles) — shifts on scroll position
  // -------------------------------------------------------------------------
  function initParallax() {
    var els = document.querySelectorAll('[data-parallax]')
    if (els.length === 0) return
    function update() {
      var vh = window.innerHeight
      els.forEach(function (el) {
        var factor = parseFloat(el.getAttribute('data-parallax')) || 0.15
        var rect = el.parentElement.getBoundingClientRect()
        var center = rect.top + rect.height / 2
        var offset = (center - vh / 2) * factor
        el.style.setProperty('--tile-shift', offset.toFixed(1) + 'px')
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
  }

  // -------------------------------------------------------------------------
  // Count-up numbers (e.g. "24 Works") — animates from 0 on scroll-in
  // -------------------------------------------------------------------------
  function initCountUp() {
    var els = document.querySelectorAll('.count-up')
    if (els.length === 0) return
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return
          var el = entry.target
          var target = parseInt(el.getAttribute('data-count'), 10) || 0
          var start = null
          var duration = 900
          function step(ts) {
            if (!start) start = ts
            var progress = Math.min((ts - start) / duration, 1)
            var eased = 1 - Math.pow(1 - progress, 3)
            el.textContent = Math.round(eased * target)
            if (progress < 1) window.requestAnimationFrame(step)
          }
          window.requestAnimationFrame(step)
          observer.unobserve(el)
        })
      },
      { threshold: 0.4 }
    )
    els.forEach(function (el) { observer.observe(el) })
  }

  // -------------------------------------------------------------------------
  // Project card 3D tilt — follows cursor position within the card
  // -------------------------------------------------------------------------
  function initTilt() {
    if (isTouch) return
    var cards = document.querySelectorAll('[data-tilt]')
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect()
        var px = (e.clientX - rect.left) / rect.width - 0.5
        var py = (e.clientY - rect.top) / rect.height - 0.5
        var rotY = px * 10
        var rotX = py * -10
        card.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)'
      })
      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
      })
    })
  }

  // -------------------------------------------------------------------------
  // Page transition curtain — plays a brief wipe when navigating internally
  // -------------------------------------------------------------------------
  function initPageTransition() {
    var curtain = document.querySelector('.page-transition')
    if (!curtain) return

    // Reveal on load (curtain starts covering, then slides away)
    curtain.classList.add('is-active')
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        curtain.classList.remove('is-active')
      })
    })

    var links = document.querySelectorAll('a[href^="/"]')
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href')
        if (!href || href.charAt(0) !== '/' || link.target === '_blank') return
        if (href === window.location.pathname) return
        e.preventDefault()
        curtain.classList.add('is-leaving')
        window.setTimeout(function () {
          window.location.href = href
        }, 380)
      })
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
    initMagnetic()
    initParallax()
    initCountUp()
    initTilt()
    initPageTransition()
  })
})()
