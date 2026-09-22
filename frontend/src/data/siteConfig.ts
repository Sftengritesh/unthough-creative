/**
 * UNTHOUGHT CREATIVE — Centralized Site Configuration
 * ----------------------------------------------------
 * Update business name, contact details, services, packages, etc. here.
 * Every component in the app reads from this single file.
 */

export const business = {
  name: 'UNTHOUGHT CREATIVE',
  shortName: 'Unthought',
  tagline: 'Turning Attention Into Growth.',
  supportingLine: 'Creative content. Strategic storytelling. Measurable growth.',
  footerLine: 'Creative content. Strategic growth.',
  year: 2026,
}

export const contact = {
  phone: '6388716210',
  phoneDisplay: '+91 6388716210',
  whatsappNumber: '916388716210', // country code + number, no symbols
  whatsappMessage:
    "Hi Unthought Creative, I'd like to discuss social media content services for my business.",
  instagramHandle: '@unthoughtcreative',
  instagramUrl: 'https://instagram.com/unthoughtcreative',
  email: 'hello@unthoughtcreative.com',
}

export const whatsappLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  contact.whatsappMessage
)}`

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Packages', href: '#packages' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const audiences = [
  {
    title: 'Restaurants & Cafes',
    desc: 'Mouth-watering visuals and story content that fill tables.',
    tag: 'Food & Hospitality',
    image: '/images/cafe.jpg',
  },
  {
    title: 'Fitness & Wellness',
    desc: 'High-energy reels and transformation-driven storytelling.',
    tag: 'Gyms & Studios',
    image: '/images/fitness.jpg',
  },
  {
    title: 'Salons & Beauty',
    desc: 'Aesthetic-first content that showcases skill and results.',
    tag: 'Beauty & Grooming',
    image: '/images/salon.jpg',
  },
  {
    title: 'Schools & Institutions',
    desc: 'Trust-building content for admissions and community.',
    tag: 'Education',
    image: '/images/education.jpg',
  },
  {
    title: 'Retail & Lifestyle',
    desc: 'Scroll-stopping product content that drives conversions.',
    tag: 'Clothing & Retail',
    image: '/images/fashion.jpg',
  },
  {
    title: 'Startups & Personal Brands',
    desc: 'Positioning-led content that builds authority fast.',
    tag: 'Founders & Creators',
    image: '/images/video_production.jpg',
  },
]

export const services = [
  {
    number: '01',
    title: 'Short-Form Video',
    desc: 'Reels, promotional videos, and engaging short-form content.',
  },
  {
    number: '02',
    title: 'Social Media Design',
    desc: 'Professional posts, carousels, promotional creatives, and campaign visuals.',
  },
  {
    number: '03',
    title: 'Story Content',
    desc: 'Daily updates, offers, behind-the-scenes, and audience engagement.',
  },
  {
    number: '04',
    title: 'Page Management',
    desc: 'Posting, scheduling, replying, and maintaining consistency.',
  },
  {
    number: '05',
    title: 'Content Strategy',
    desc: 'Content planning, trends, audience research, and campaign direction.',
  },
  {
    number: '06',
    title: 'Brand Shoots',
    desc: 'Professional business, product, lifestyle, and location shoots.',
  },
  {
    number: '07',
    title: 'Captions & Hashtags',
    desc: 'Captions and discoverability-focused content support.',
  },
  {
    number: '08',
    title: 'Video Editing',
    desc: 'Professional editing optimized for social platforms.',
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Understand',
    desc: 'We learn about your brand, audience, and goals.',
  },
  {
    number: '02',
    title: 'Strategize',
    desc: 'We build a content direction tailored to your business.',
  },
  {
    number: '03',
    title: 'Create',
    desc: 'We produce high-quality visuals, videos, and campaigns.',
  },
  {
    number: '04',
    title: 'Grow',
    desc: 'We maintain consistency and improve based on performance.',
  },
]

export const portfolioCategories = [
  { key: 'all', label: 'All' },
  { key: 'food', label: 'Food & Hospitality' },
  { key: 'fitness', label: 'Fitness' },
  { key: 'beauty', label: 'Beauty & Lifestyle' },
  { key: 'education', label: 'Education' },
  { key: 'brand', label: 'Brand Campaigns' },
  { key: 'product', label: 'Product Content' },
]

export const portfolioItems = [
  { id: 1, title: 'Café Launch Campaign', category: 'food', label: 'Sample Campaign', ratio: 'portrait', image: '/images/cafe.jpg' },
  { id: 2, title: 'Fitness Transformation Series', category: 'fitness', label: 'Selected Concept', ratio: 'square', image: '/images/fitness.jpg' },
  { id: 3, title: 'Salon Rebrand Content', category: 'beauty', label: 'Creative Direction', ratio: 'portrait', image: '/images/salon.jpg' },
  { id: 4, title: 'Institute Admissions Push', category: 'education', label: 'Sample Campaign', ratio: 'landscape', image: '/images/education.jpg' },
  { id: 5, title: 'Restaurant Menu Reels', category: 'food', label: 'Selected Concept', ratio: 'portrait', image: '/images/cafe.jpg' },
  { id: 6, title: 'Apparel Drop Campaign', category: 'brand', label: 'Creative Direction', ratio: 'square', image: '/images/fashion.jpg' },
  { id: 7, title: 'Gym Opening Content', category: 'fitness', label: 'Sample Campaign', ratio: 'landscape', image: '/images/fitness.jpg' },
  { id: 8, title: 'Product Shoot Series', category: 'product', label: 'Selected Concept', ratio: 'square', image: '/images/content_shoot.jpg' },
  { id: 9, title: 'Personal Brand Positioning', category: 'brand', label: 'Creative Direction', ratio: 'portrait', image: '/images/video_production.jpg' },
]

export const whyUs = [
  'Strategy Before Execution',
  'Content Built Around Your Brand',
  'Consistent Visual Identity',
  'Platform-Ready Content',
  'Flexible Packages',
  'Direct Communication',
  'Business-Focused Creativity',
]

export const introStats = [
  { label: 'Creative Strategy' },
  { label: 'Consistent Execution' },
  { label: 'Brand-Focused Content' },
  { label: 'Growth-Oriented Thinking' },
]

export type Package = {
  name: string
  price: string
  period: string
  audience: string
  featured?: boolean
  includes: string[]
}
export const packages: Package[] = [
  {
    name: 'Basic',
    price: '₹8,000',
    period: '/MONTH',
    audience: 'Perfect for small businesses & startups.',
    includes: [
      '12 Reels (edited + designed)',
      '8 Posts (design + captions + hashtags)',
      '12 Stories (daily updates)',
      '1 On-site Visit / Week',
      '4 Videos Shot in One Visit',
      'Reels Editing & Post Designs',
      'Captions & Hashtags',
    ],
  },
  {
    name: 'Growth',
    price: '₹10,000',
    period: '/MONTH',
    audience: 'More content. Better management. Real growth.',
    featured: true,
    includes: [
      '15 Reels (edited + designed)',
      '10 Posts (design + captions + hashtags)',
      '20 Stories (daily updates)',
      '1 On-site Visit / Week',
      '4 Videos Shot in One Visit',
      'Page Management (posting + replying)',
      'Basic Content Planning',
    ],
  },
  {
    name: 'Pro',
    price: '₹15,000',
    period: '/MONTH',
    audience: 'Strategy-driven. For long-term success.',
    includes: [
      '20 Reels (edited + designed)',
      '12 Posts (design + captions + hashtags)',
      '30 Stories (daily updates)',
      '2 On-site Visits / Week',
      '4 Videos Shot in Each Visit',
      'Page Management (posting + replying)',
      'Advanced Content Strategy',
      'Trend Research',
      'Monthly Content Calendar',
    ],
  },
]

export const faqs = [
  {
    q: 'What types of businesses do you work with?',
    a: 'We work with restaurants, gyms and fitness centers, salons and beauty businesses, schools, cafes, clothing brands, local businesses, startups, and personal brands — essentially any business that wants a stronger social media presence.',
  },
  {
    q: 'Do you provide on-site shooting?',
    a: 'Yes. Most packages include scheduled on-site visits for photo and video content, so your feed stays fresh and authentic to your actual business.',
  },
  {
    q: 'Can packages be customized?',
    a: 'Absolutely. Our packages are starting points — we regularly adjust deliverables, visit frequency, and scope based on your specific business requirements.',
  },
  {
    q: 'Do you manage Instagram pages?',
    a: 'Yes, page management is available as part of our Growth and Pro packages, covering posting, scheduling, and maintaining consistency.',
  },
  {
    q: 'Do you provide only video editing?',
    a: 'No — while video editing is one of our core services, we offer a full suite including strategy, design, photography, and page management. Standalone editing can also be discussed separately.',
  },
  {
    q: 'How does the onboarding process work?',
    a: 'We start with a discovery conversation to understand your brand, then move into strategy, content planning, and production — outlined in our four-step process above.',
  },
  {
    q: 'How long does it take to start?',
    a: 'Once we align on a package and onboarding details, most projects begin content production within the first one to two weeks.',
  },
  {
    q: 'Do you create content for platforms other than Instagram?',
    a: 'Yes. While Instagram is our primary focus, content is frequently adapted for platforms like Facebook and other short-form video channels on request.',
  },
]
