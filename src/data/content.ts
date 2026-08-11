// ============================================================================
// JUNE HONG Portfolio — Content Data Model
// Site copy is in English. Category keys stay in sync with the folder names
// under public/static/images/.
// ============================================================================

export type MediaKind = 'video' | 'photo'

export interface Category {
  key: string
  kind: MediaKind
  labelKo: string
  labelEn: string
  slug: string
  description: string
}

export interface Project {
  id: string
  categoryKey: string
  title: string
  year: string
  cover: string
  // For video projects: external link the thumbnail should open (placeholder for now)
  externalUrl?: string
  tags: string[]
  isPlaceholder: boolean // true = stock/licensed placeholder, not confirmed client work
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const VIDEO_CATEGORIES: Category[] = [
  { key: 'reels', kind: 'video', labelKo: '릴스', labelEn: 'Reels', slug: 'reels', description: 'Short-form vertical content built for reach and retention.' },
  { key: 'event-recap', kind: 'video', labelKo: '이벤트 리캡', labelEn: 'Event Recap', slug: 'event-recap', description: 'Highlight films that compress a full-day event into its essential moments.' },
  { key: 'brand-film', kind: 'video', labelKo: '브랜드필름', labelEn: 'Brand Film', slug: 'brand-film', description: 'Narrative-driven films that build brand identity and emotional recall.' },
  { key: 'documentary', kind: 'video', labelKo: '다큐멘터리', labelEn: 'Documentary', slug: 'documentary', description: 'Long-form, character-led storytelling grounded in real people and places.' },
  { key: 'advertising', kind: 'video', labelKo: '광고', labelEn: 'Advertising', slug: 'advertising', description: 'Commercial spots engineered for conversion across broadcast and digital.' },
  { key: 'art', kind: 'video', labelKo: '미술', labelEn: 'Art', slug: 'art', description: 'Experimental, visually-led motion work made without commercial brief.' },
]

export const PHOTO_CATEGORIES: Category[] = [
  { key: 'food', kind: 'photo', labelKo: '음식', labelEn: 'Food', slug: 'food', description: 'Appetite-first photography for menus, delivery apps and campaigns.' },
  { key: 'clothing', kind: 'photo', labelKo: '의류', labelEn: 'Clothing', slug: 'clothing', description: 'Apparel and lookbook photography with a focus on fit and fabric.' },
  { key: 'product', kind: 'photo', labelKo: '제품', labelEn: 'Product', slug: 'product', description: 'Clean, commerce-ready product photography for catalog and ads.' },
  { key: 'venue', kind: 'photo', labelKo: '베뉴', labelEn: 'Venue', slug: 'venue', description: 'Architectural and interior photography for hospitality and events.' },
  { key: 'ai', kind: 'photo', labelKo: 'AI', labelEn: 'AI', slug: 'ai', description: 'AI-assisted and generative visual work for concept and campaign design.' },
]

export const ALL_CATEGORIES = [...VIDEO_CATEGORIES, ...PHOTO_CATEGORIES]

export function getCategory(kind: MediaKind, slug: string): Category | undefined {
  return (kind === 'video' ? VIDEO_CATEGORIES : PHOTO_CATEGORIES).find((c) => c.slug === slug)
}

// ---------------------------------------------------------------------------
// Projects
// NOTE: All entries below are licensed stock placeholder images
// (isPlaceholder: true) per client direction ("Option B") — structured so
// any slot can be swapped for real client work later without touching the
// template. Video externalUrl fields are "#" placeholders pending real
// YouTube / Vimeo links.
// ---------------------------------------------------------------------------

function buildVideoPlaceholders(categoryKey: string, count: number, titlePrefix: string): Project[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${categoryKey}-${i + 1}`,
    categoryKey,
    title: `${titlePrefix} 0${i + 1}`,
    year: '2024',
    cover: `/static/images/video/${categoryKey}/${i + 1}.jpg`,
    externalUrl: '#',
    tags: [titlePrefix],
    isPlaceholder: true,
  }))
}

function buildPhotoPlaceholders(categoryKey: string, count: number, titlePrefix: string): Project[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${categoryKey}-${i + 1}`,
    categoryKey,
    title: `${titlePrefix} 0${i + 1}`,
    year: '2024',
    cover: `/static/images/photo/${categoryKey}/${i + 1}.jpg`,
    tags: [titlePrefix],
    isPlaceholder: true,
  }))
}

export const PROJECTS: Project[] = [
  ...buildVideoPlaceholders('reels', 4, 'Reel'),
  ...buildVideoPlaceholders('event-recap', 4, 'Event Recap'),
  ...buildVideoPlaceholders('brand-film', 4, 'Brand Film'),
  ...buildVideoPlaceholders('documentary', 4, 'Documentary'),
  ...buildVideoPlaceholders('advertising', 4, 'Advertising'),
  ...buildVideoPlaceholders('art', 4, 'Art Film'),
  ...buildPhotoPlaceholders('food', 4, 'Food Story'),
  ...buildPhotoPlaceholders('clothing', 4, 'Lookbook'),
  ...buildPhotoPlaceholders('product', 4, 'Product Shot'),
  ...buildPhotoPlaceholders('venue', 4, 'Venue Study'),
  ...buildPhotoPlaceholders('ai', 4, 'AI Generative'),
]

export function projectsByCategory(categoryKey: string): Project[] {
  return PROJECTS.filter((p) => p.categoryKey === categoryKey)
}

export function projectsByKind(kind: MediaKind): Project[] {
  const keys = (kind === 'video' ? VIDEO_CATEGORIES : PHOTO_CATEGORIES).map((c) => c.key)
  return PROJECTS.filter((p) => keys.includes(p.categoryKey))
}

// ---------------------------------------------------------------------------
// BTS / working photos — interspersed between portfolio entries
// ---------------------------------------------------------------------------
export const BTS_PHOTOS = [
  '/static/images/bts/bts-1.png',
  '/static/images/bts/bts-2.jpg',
  '/static/images/bts/bts-3.jpg',
  '/static/images/bts/bts-4.jpg',
]

export const PROFILE_PHOTO = '/static/images/profile/headshot.png'

// ---------------------------------------------------------------------------
// Resume / About Me content
// Source: uploaded CV ("2022 RESUME_홍준성_촬영및편집.docx"), transcribed in full
// and translated to English.
//
// Corrections applied per client request:
//  - Paran-o-i Co., Ltd. (파란오이) employment end date changed
//    2021.05 -> 2022.12
//  - New entry added: JK WORLD GROUP, 2023.02 - Present
// ---------------------------------------------------------------------------
export const RESUME = {
  name: 'JUNE HONG',
  nameKo: '홍준성',
  role: 'Videographer · Director · Editor',
  intro:
    'A director, cinematographer and editor working across documentary, VR, commercial and narrative film since 1999. Comfortable running a full production solo — concept, shooting, aerial work, editing, CG and color — with award-winning work in Korea\u2019s VR content competitions and festival selections in Moscow, Bucheon and Thailand.',
  personalInfo: {
    name: 'Joonseong Hong (홍준성)',
    englishName: 'June Hong',
    born: 'June 16, 1980',
    height: '172cm',
    phone: '010-3799-9818',
    email: 'pseudofilmmaker@gmail.com',
    license: 'Class 1 & Class 2 Ordinary Driver\u2019s License',
    military: 'Republic of Korea Army, Sergeant — honorably discharged (Supply Corps, 2nd Logistics Support Command)',
    hobbies: ['Writing', 'Travel'],
  },
  skills: [
    { name: 'Premiere Pro', level: 92 },
    { name: 'Photoshop', level: 85 },
    { name: 'After Effects', level: 75 },
    { name: 'Illustrator', level: 65 },
    { name: 'Storyboarding', level: 58 },
    { name: 'English', level: 45 },
    { name: 'Korean', level: 100 },
  ],
  interests: ['New Media', 'Truth', 'A World We Share'],
  education: [
    {
      period: '2016.02',
      school: 'Seoul Institute of the Arts',
      degree: 'B.A., Film Major — Dept. of Media Creation',
      note: 'GPA 4.1 / 4.5',
    },
    {
      period: '2015.02',
      school: 'Seoul Institute of the Arts',
      degree: 'Associate Degree, Directing Major — Dept. of Film',
      note: 'GPA 3.8 / 4.5 · Entered 1999, re-enrolled 2013',
    },
    {
      period: '1999.02',
      school: 'Choongdong High School',
      degree: 'Graduated',
      note: '',
    },
  ],
  // "Professional Experience" — employment history (with corrections applied)
  professionalExperience: [
    {
      period: '2023.02 – Present',
      company: 'JK WORLD GROUP',
      role: 'Videographer / Video Editor',
      note: 'In-house video and photo production for group brand and marketing content.',
      current: true,
    },
    {
      period: '2021.06 – Present',
      company: 'Freelance',
      role: 'Videographer / Director / Editor',
      note: 'Independent commercial and cultural productions.',
      current: true,
    },
    {
      period: '2016.12 – 2022.12',
      company: 'Paran-o-i Co., Ltd. (파란오이)',
      role: 'PD, Content Development Team',
      note: 'Direction, cinematography, editing / immersive media production. All in-progress projects paused due to COVID-19.',
      current: false,
    },
    {
      period: '2009.12 – 2012.12',
      company: 'DNAdvertising',
      role: 'Team Lead, Content Development (Co-founder)',
      note: 'Sales, planning and production / advertising and signage facade production.',
      current: false,
    },
    {
      period: '2007.09 – 2009.02',
      company: 'Yoo Si-min Editing Studio',
      role: 'Video Editor',
      note: 'Filming, editing, CG / web and video content production.',
      current: false,
    },
  ],
  // "Experience" — selected filmography / project history from the CV
  filmography: [
    {
      year: '2022',
      title: 'The Road to Hanti',
      type: 'Documentary · YouTube',
      role: 'Cinematography, Aerial, Editing, CG',
      client: 'Hanti Association, with Chilgok County',
    },
    {
      year: '2021',
      title: 'Korea Environmental Industry Growth Support Program',
      type: 'YouTube',
      role: 'Editing, CG',
      client: 'Korea Environmental Industry & Technology Institute, with Ministry of Environment',
    },
    {
      year: '2021',
      title: 'Wild VR',
      type: 'YouTube · 37 episodes',
      role: 'Cinematography, Editing, Aerial',
      client: 'Excellent Broadcast Content Support Program, with KOCCA, Ministry of Culture, Sports and Tourism',
    },
    {
      year: '2020',
      title: 'Basement',
      type: 'Feature Film · 96 min',
      role: 'Screenplay, On-set Editing, Title Design',
      client: 'Selected — Moscow International Film Festival · Released on SK WAAVE',
    },
    {
      year: '2020',
      title: 'Daelim Acro',
      type: 'Commercial · 1 min 49 sec',
      role: 'Direction, Cinematography, Editing, CG',
      client: 'Media Wall by SCREEN X, sales gallery',
    },
    {
      year: '2019',
      title: 'Seoul Through Quantum Physics',
      type: 'VR Documentary · 12 min',
      role: 'Direction, Cinematography, Editing, CG',
      client: 'Korea VR Content Competition with NAVER, KOCCA, MCST — Award winner',
    },
    {
      year: '2019',
      title: 'Legend of the Fox Woman',
      type: 'VR Feature · 8 min',
      role: 'Cinematography, Editing',
      client: 'Korea VR Content Competition with NAVER, KOCCA, MCST',
    },
    {
      year: '2018',
      title: 'Love Is',
      type: 'Feature Film · 81 min',
      role: 'Direction, Screenplay, Aerial, Editing',
      client: 'Culture Technology R&D Support Program with KOCCA',
    },
    {
      year: '2018',
      title: 'Tower The Most',
      type: 'Commercial · 2 min 20 sec',
      role: 'Direction, Cinematography, Editing',
      client: 'Media Wall by SCREEN X, sales gallery',
    },
    {
      year: '2018',
      title: 'Hollow, Cost / My Father\u2019s Birthday Gift',
      type: 'Short Films',
      role: 'Editing, Direction',
      client: 'And other short-form work',
    },
    {
      year: '2017',
      title: 'Jeongjo\u2019s Dream, Suwon Hwaseong',
      type: '3D Documentary · 14 min',
      role: 'Direction, Aerial',
      client: 'Cultural Heritage Administration',
    },
    {
      year: '2017',
      title: 'ASEAN Culture House — Media Wall',
      type: 'Documentary Installation',
      role: 'Direction, Cinematography',
      client: 'Cambodia / Myanmar / Indonesia episodes, with Ministry of Foreign Affairs, Korea Foundation, ASEAN Culture House',
    },
    {
      year: '2016–17',
      title: 'Bicycle Road',
      type: 'Documentary Series · 4 episodes',
      role: 'Direction, Editing',
      client: 'Japan / Taiwan episodes, with Korea Independent Broadcasters Association, Contents Square, Paran-o-i Film',
    },
    {
      year: '2016',
      title: 'TV Cello',
      type: 'Feature Film · SCREEN X',
      role: 'Screenplay, Producer',
      client: 'KAFA Film × CGV SCREEN X — Official Selection, Bucheon International Fantastic Film Festival',
    },
    {
      year: '2016',
      title: 'Amado Annuallale — Mokha in Progress',
      type: 'Group Exhibition · 8 Artists',
      role: 'Artist — "Jouissance," 3-channel media installation',
      client: 'With artist Sang-jin Kim',
    },
    {
      year: '2015',
      title: 'Future Is Mine',
      type: '3D Feature Film',
      role: 'Direction, Screenplay, Editing',
      client: '',
    },
    {
      year: '2015',
      title: '29cm Shopping Video',
      type: 'Commercial',
      role: 'Producer',
      client: '',
    },
    {
      year: '2014',
      title: 'Most Sweetest',
      type: 'Short Film',
      role: 'Direction',
      client: 'Official Selection — Thailand International Film Festival',
    },
    {
      year: '2008',
      title: 'KRA Busan Racing Association',
      type: 'Jingle / CM Song',
      role: 'Lyrics',
      client: '',
    },
    {
      year: '1999–2013',
      title: 'How to Become the Pirate Disco King, and numerous other films',
      type: 'Feature Films',
      role: 'Script polishing, direction, cinematography, art direction, music, editing, sound recording',
      client: '',
    },
  ],
  awards: [
    { year: '2016', title: '8th 3D KIFF (3D International Film Festival) — Special Award', note: 'Future Is Mine (2016, 3D) — Direction' },
    { year: '2019', title: '1st VROUND VR Content Competition — Excellence Award', note: 'Seoul Through Quantum Physics (2019, VR) — Cinematography, Direction' },
    { year: '2019', title: '1st VROUND VR Content Competition — Grand Prize', note: 'Legend of the Fox Woman (2019, VR) — Cinematography, Editing' },
  ],
} as const
