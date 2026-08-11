import type { FC } from 'hono/jsx'

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/video', label: 'Video' },
  { href: '/photo', label: 'Photo' },
  { href: '/about', label: 'About' },
]

export const Header: FC<{ active?: string }> = ({ active }) => {
  return (
    <header className="site-header">
      <a href="/" className="logo" data-cursor="Home">
        JUNE HONG<span>DIRECTOR / DP</span>
      </a>
      <nav className="main-nav" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} className={active === item.href ? 'is-active' : ''}>
            {item.label}
          </a>
        ))}
      </nav>
      <button className="nav-toggle" aria-label="Toggle menu">
        MENU
      </button>
    </header>
  )
}

export const NoiseLayers: FC = () => (
  <>
    <div className="grain-layer" aria-hidden="true"></div>
    <div className="noise-layer" aria-hidden="true"></div>
  </>
)

export const Loader: FC = () => (
  <div className="loader-veil" aria-hidden="true">
    <div className="loader-word">
      JUNE<span>.</span>HONG
    </div>
  </div>
)

export const Lightbox: FC = () => (
  <div className="lightbox">
    <button className="lightbox-close" aria-label="Close">
      CLOSE ✕
    </button>
    <img src="" alt="" />
  </div>
)

export const Footer: FC = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-top">
        <p className="footer-cta">
          Have a story worth <em>filming</em>?
          <br />
          Let&rsquo;s make it real.
        </p>
        <div className="footer-links">
          <a href="mailto:pseudofilmmaker@gmail.com">pseudofilmmaker@gmail.com</a>
          <a href="tel:01037999818">010&#8209;3799&#8209;9818</a>
          <a href="/about">About June Hong →</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} JUNE HONG — HONG JOONSEONG</span>
        <span>VIDEO · PHOTO · SEOUL, KR</span>
      </div>
    </div>
  </footer>
)
