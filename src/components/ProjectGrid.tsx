import type { FC } from 'hono/jsx'
import type { Project } from '../data/content'
import { BTS_PHOTOS } from '../data/content'

export const ProjectCard: FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isVideo = !!project.externalUrl
  const Tag: any = isVideo ? 'a' : 'button'
  const tagProps: Record<string, any> = isVideo
    ? { href: project.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
    : { type: 'button', 'data-lightbox': project.cover }

  return (
    <Tag
      className="project-card reveal"
      data-category={project.categoryKey}
      data-cursor={isVideo ? 'Watch' : 'View'}
      data-tilt="true"
      {...tagProps}
    >
      <span className="card-index mono">{String(index + 1).padStart(2, '0')}</span>
      {isVideo && (
        <span className="card-external" aria-hidden="true">
          ↗
        </span>
      )}
      <img src={project.cover} alt={project.title} loading="lazy" />
      <span className="card-overlay">
        <span className="card-title">{project.title}</span>
        <span className="card-tag">{project.tags.join(' · ')}</span>
      </span>
      {project.isPlaceholder && <span className="placeholder-badge">Reference Image</span>}
    </Tag>
  )
}

export const BtsStrip: FC<{ seed: number; caption?: string }> = ({ seed, caption }) => {
  const photo = BTS_PHOTOS[seed % BTS_PHOTOS.length]
  return (
    <div className="bts-strip">
      <img src={photo} alt="June Hong on set" loading="lazy" />
      <span className="bts-label">On Set</span>
      {caption && <span className="bts-caption">{caption}</span>}
    </div>
  )
}

/**
 * Renders a project grid and intersperses a full-width BTS ("working photo")
 * strip after every `interval` items.
 */
export const ProjectGridWithBts: FC<{ projects: Project[]; interval?: number }> = ({ projects, interval = 6 }) => {
  const nodes: any[] = []
  let btsSeed = 0
  projects.forEach((project, i) => {
    nodes.push(<ProjectCard key={project.id} project={project} index={i} />)
    if ((i + 1) % interval === 0 && i !== projects.length - 1) {
      nodes.push(<BtsStrip key={`bts-${i}`} seed={btsSeed} caption="June Hong, behind the camera" />)
      btsSeed += 1
    }
  })
  return <div className="project-grid">{nodes}</div>
}
