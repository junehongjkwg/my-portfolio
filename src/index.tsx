import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { Header, Footer, NoiseLayers, Loader, Lightbox } from './components/Layout'
import { ProjectGridWithBts } from './components/ProjectGrid'
import {
  VIDEO_CATEGORIES,
  PHOTO_CATEGORIES,
  ALL_CATEGORIES,
  PROJECTS,
  projectsByKind,
  getCategory,
  RESUME,
  PROFILE_PHOTO,
} from './data/content'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))
app.use(renderer)

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------
app.get('/', (c) => {
  const videoCount = projectsByKind('video').length
  const photoCount = projectsByKind('photo').length

  return c.render(
    <div className="page">
      <NoiseLayers />
      <Loader />
      <Lightbox />
      <Header active="/" />

      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow mono">Videographer &amp; Photographer — Based in Seoul</p>
          <h1 className="hero-title">
            <span className="fill">VISUAL</span>
            <br />
            <span className="outline">STORY</span>
            <span className="accent">teller.</span>
          </h1>
          <div className="hero-sub">
            <p className="hero-desc">
              June Hong directs, shoots and edits brand film, documentary, advertising and
              commercial photography — from concept to final color.
            </p>
            <p className="hero-meta">
              JUNE HONG
              <br />
              홍준성 · JOONSEONG HONG
              <br />
              SEOUL, KOREA
            </p>
          </div>
        </div>
        <div className="hero-scroll">
          <span className="bar"></span>
          Scroll
        </div>
      </section>

      <div className="marquee-strip">
        <div className="marquee-track">
          <span>
            {ALL_CATEGORIES.map((cat) => (
              <>
                {cat.labelEn.toUpperCase()} <span className="dot">●</span>
              </>
            ))}
          </span>
          <span>
            {ALL_CATEGORIES.map((cat) => (
              <>
                {cat.labelEn.toUpperCase()} <span className="dot">●</span>
              </>
            ))}
          </span>
        </div>
      </div>

      <div className="split-nav">
        <a href="/video" className="split-tile" data-cursor="Enter">
          <div
            className="split-bg"
            style={`background-image:url('/static/images/video/brand-film/1.jpg')`}
          ></div>
          <div className="split-tile-content">
            <p className="split-kicker mono">01 — Motion</p>
            <h2 className="split-title">
              VIDEO
              <span className="ko">비디오</span>
            </h2>
            <p className="split-count mono">{videoCount} Works / 6 Categories</p>
          </div>
        </a>
        <a href="/photo" className="split-tile" data-cursor="Enter">
          <div
            className="split-bg"
            style={`background-image:url('/static/images/photo/venue/1.jpg')`}
          ></div>
          <div className="split-tile-content">
            <p className="split-kicker mono">02 — Stills</p>
            <h2 className="split-title">
              PHOTO
              <span className="ko">포토</span>
            </h2>
            <p className="split-count mono">{photoCount} Works / 5 Categories</p>
          </div>
        </a>
      </div>

      <section className="section container">
        <div className="section-head reveal">
          <div>
            <p className="section-index">Selected Work</p>
            <h2 className="section-title">
              A glimpse <em>behind</em> the lens
            </h2>
          </div>
          <p className="section-note">
            Reference placeholders shown below for categories awaiting confirmed client work —
            swap-ready for real footage and photography.
          </p>
        </div>
        <ProjectGridWithBts projects={PROJECTS.slice(0, 9)} interval={12} />
        <div style="text-align:center;margin-top:48px;">
          <a href="/video" className="filter-pill" data-cursor="Go">
            View All Work →
          </a>
        </div>
      </section>

      <Footer />
    </div>,
    { title: 'Home' }
  )
})

// ---------------------------------------------------------------------------
// VIDEO listing
// ---------------------------------------------------------------------------
app.get('/video', (c) => {
  const projects = projectsByKind('video')
  return c.render(
    <div className="page">
      <NoiseLayers />
      <Lightbox />
      <Header active="/video" />

      <section className="section container" style="padding-top:160px;">
        <div className="section-head reveal">
          <div>
            <p className="section-index">01 — Video</p>
            <h2 className="section-title">
              비디오 <em>Motion Work</em>
            </h2>
          </div>
          <p className="section-note">
            Reels, event recap, brand film, documentary, advertising and art — click any thumbnail
            to open the source video.
          </p>
        </div>

        <div className="filter-rail reveal">
          <button className="filter-pill is-active" data-filter="all">
            All
          </button>
          {VIDEO_CATEGORIES.map((cat) => (
            <button className="filter-pill" data-filter={cat.key}>
              {cat.labelEn}
              <span className="ko">{cat.labelKo}</span>
            </button>
          ))}
        </div>

        <ProjectGridWithBts projects={projects} interval={8} />
      </section>

      <Footer />
    </div>,
    { title: 'Video' }
  )
})

// ---------------------------------------------------------------------------
// PHOTO listing
// ---------------------------------------------------------------------------
app.get('/photo', (c) => {
  const projects = projectsByKind('photo')
  return c.render(
    <div className="page">
      <NoiseLayers />
      <Lightbox />
      <Header active="/photo" />

      <section className="section container" style="padding-top:160px;">
        <div className="section-head reveal">
          <div>
            <p className="section-index">02 — Photo</p>
            <h2 className="section-title">
              포토 <em>Still Work</em>
            </h2>
          </div>
          <p className="section-note">
            Food, clothing, product, venue and AI-generated imagery — click any image to view it
            full-screen.
          </p>
        </div>

        <div className="filter-rail reveal">
          <button className="filter-pill is-active" data-filter="all">
            All
          </button>
          {PHOTO_CATEGORIES.map((cat) => (
            <button className="filter-pill" data-filter={cat.key}>
              {cat.labelEn}
              <span className="ko">{cat.labelKo}</span>
            </button>
          ))}
        </div>

        <ProjectGridWithBts projects={projects} interval={8} />
      </section>

      <Footer />
    </div>,
    { title: 'Photo' }
  )
})

// ---------------------------------------------------------------------------
// Category detail pages (optional deep links): /video/:slug and /photo/:slug
// ---------------------------------------------------------------------------
app.get('/video/:slug', (c) => {
  const slug = c.req.param('slug')
  const category = getCategory('video', slug)
  if (!category) return c.notFound()
  const projects = PROJECTS.filter((p) => p.categoryKey === category.key)

  return c.render(
    <div className="page">
      <NoiseLayers />
      <Lightbox />
      <Header active="/video" />
      <section className="section container" style="padding-top:160px;">
        <div className="section-head reveal">
          <div>
            <p className="section-index">Video / {category.labelKo}</p>
            <h2 className="section-title">{category.labelEn}</h2>
          </div>
          <p className="section-note">{category.description}</p>
        </div>
        <div className="project-grid">
          {projects.map((project, i) => (
            <a
              className="project-card reveal"
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Watch"
            >
              <span className="card-index mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="card-external" aria-hidden="true">
                ↗
              </span>
              <img src={project.cover} alt={project.title} loading="lazy" />
              <span className="card-overlay">
                <span className="card-title">{project.title}</span>
              </span>
              {project.isPlaceholder && <span className="placeholder-badge">Reference Image</span>}
            </a>
          ))}
        </div>
        <div style="margin-top:40px;">
          <a href="/video" className="filter-pill" data-cursor="Back">
            ← All Video
          </a>
        </div>
      </section>
      <Footer />
    </div>,
    { title: `${category.labelEn} — Video` }
  )
})

app.get('/photo/:slug', (c) => {
  const slug = c.req.param('slug')
  const category = getCategory('photo', slug)
  if (!category) return c.notFound()
  const projects = PROJECTS.filter((p) => p.categoryKey === category.key)

  return c.render(
    <div className="page">
      <NoiseLayers />
      <Lightbox />
      <Header active="/photo" />
      <section className="section container" style="padding-top:160px;">
        <div className="section-head reveal">
          <div>
            <p className="section-index">Photo / {category.labelKo}</p>
            <h2 className="section-title">{category.labelEn}</h2>
          </div>
          <p className="section-note">{category.description}</p>
        </div>
        <div className="project-grid">
          {projects.map((project, i) => (
            <button className="project-card reveal" data-lightbox={project.cover} data-cursor="View">
              <span className="card-index mono">{String(i + 1).padStart(2, '0')}</span>
              <img src={project.cover} alt={project.title} loading="lazy" />
              <span className="card-overlay">
                <span className="card-title">{project.title}</span>
              </span>
              {project.isPlaceholder && <span className="placeholder-badge">Reference Image</span>}
            </button>
          ))}
        </div>
        <div style="margin-top:40px;">
          <a href="/photo" className="filter-pill" data-cursor="Back">
            ← All Photo
          </a>
        </div>
      </section>
      <Footer />
    </div>,
    { title: `${category.labelEn} — Photo` }
  )
})

// ---------------------------------------------------------------------------
// ABOUT
// ---------------------------------------------------------------------------
app.get('/about', (c) => {
  return c.render(
    <div className="page">
      <NoiseLayers />
      <Header active="/about" />

      <section className="container">
        <div className="about-hero">
          <div className="about-portrait reveal">
            <img src={PROFILE_PHOTO} alt="June Hong portrait" />
          </div>
          <div>
            <p className="hero-eyebrow mono reveal">About</p>
            <h1 className="about-name reveal">
              JUNE HONG
              <span className="ko">{RESUME.nameKo} · Joonseong Hong</span>
            </h1>
            <p className="about-role reveal">{RESUME.role}</p>
            <p className="about-intro reveal">{RESUME.intro}</p>

            <dl className="info-grid reveal">
              <div>
                <dt>Phone</dt>
                <dd>{RESUME.personalInfo.phone}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{RESUME.personalInfo.email}</dd>
              </div>
              <div>
                <dt>Height</dt>
                <dd>{RESUME.personalInfo.height}</dd>
              </div>
              <div>
                <dt>Hobbies</dt>
                <dd>{RESUME.personalInfo.hobbies.join(', ')}</dd>
              </div>
              <div>
                <dt>License</dt>
                <dd>{RESUME.personalInfo.license}</dd>
              </div>
              <div>
                <dt>Military Service</dt>
                <dd>{RESUME.personalInfo.military}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Career / Professional Experience                               */}
      {/* -------------------------------------------------------------- */}
      <section className="section container">
        <div className="section-head reveal">
          <div>
            <p className="section-index">Career</p>
            <h2 className="section-title">
              Professional <em>Experience</em>
            </h2>
          </div>
          <p className="section-note">Employment history, most recent first.</p>
        </div>
        <div className="timeline">
          {RESUME.professionalExperience.map((job) => (
            <div className="timeline-row reveal">
              <span className="timeline-period">{job.period}</span>
              <div className="timeline-body">
                <h4>
                  {job.company} <span className="mono" style="color:var(--text-faint);font-size:12px;">/ {job.role}</span>
                </h4>
                <p>{job.note}</p>
              </div>
              {job.current && <span className="timeline-current">Current</span>}
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Education                                                       */}
      {/* -------------------------------------------------------------- */}
      <section className="section container">
        <div className="section-head reveal">
          <div>
            <p className="section-index">Background</p>
            <h2 className="section-title">
              Education <em>&amp; Skills</em>
            </h2>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:60px;">
          <div className="timeline">
            {RESUME.education.map((edu) => (
              <div className="timeline-row reveal" style="grid-template-columns:120px 1fr;">
                <span className="timeline-period">{edu.period}</span>
                <div className="timeline-body">
                  <h4>{edu.school}</h4>
                  <p>
                    {edu.degree}
                    {edu.note ? ` — ${edu.note}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="skill-bars reveal">
            {RESUME.skills.map((skill) => (
              <div className="skill-row">
                <span>{skill.name}</span>
                <div className="skill-track">
                  <div className="skill-fill" data-level={skill.level}></div>
                </div>
                <span style="text-align:right;color:var(--text-faint);">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Filmography                                                     */}
      {/* -------------------------------------------------------------- */}
      <section className="section container">
        <div className="section-head reveal">
          <div>
            <p className="section-index">Filmography</p>
            <h2 className="section-title">
              Selected <em>Projects</em>
            </h2>
          </div>
          <p className="section-note">1999–2022 · Direction, cinematography, editing &amp; more.</p>
        </div>
        <div className="filmo-list">
          {RESUME.filmography.map((f) => (
            <div className="filmo-row reveal">
              <span className="filmo-year">{f.year}</span>
              <div>
                <div className="filmo-title">{f.title}</div>
                <div className="filmo-type">{f.type}</div>
              </div>
              <div>
                <div className="filmo-role">{f.role}</div>
                {f.client && <div className="filmo-client">{f.client}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Awards                                                          */}
      {/* -------------------------------------------------------------- */}
      <section className="section container">
        <div className="section-head reveal">
          <div>
            <p className="section-index">Recognition</p>
            <h2 className="section-title">
              Awards <em>&amp; Selections</em>
            </h2>
          </div>
        </div>
        <div className="timeline">
          {RESUME.awards.map((award) => (
            <div className="timeline-row reveal" style="grid-template-columns:100px 1fr;">
              <span className="timeline-period">{award.year}</span>
              <div className="timeline-body">
                <h4>{award.title}</h4>
                <p>{award.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>,
    { title: 'About' }
  )
})

export default app
