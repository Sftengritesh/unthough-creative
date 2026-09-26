import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDir = path.resolve('scratch_edge_temp');
const absImg = (rel) => path.resolve(rel).replace(/\\/g, '/');

const audiences = [
  {
    id: 'cafe',
    tag: 'Food & Hospitality',
    service: 'Restaurant & Café Content',
    desc: 'Mouth-watering visuals, ambience shoots, and story content that fill tables.',
    deliverables: ['Ambience & Menu Shoots', 'Viral Reels & Food Styling', 'Table Reservation Stories', 'Launch & Offer Campaigns'],
    image: absImg('frontend/public/images/cafe.jpg'),
  },
  {
    id: 'fitness',
    tag: 'Gyms & Studios',
    service: 'Fitness & Wellness Content',
    desc: 'High-energy workout reels and transformation-driven storytelling.',
    deliverables: ['Trainer & Equipment Shoots', 'Member Transformation Stories', 'High-Intensity Workout Reels', 'Membership Drive Campaigns'],
    image: absImg('frontend/public/images/fitness.jpg'),
  },
  {
    id: 'salon',
    tag: 'Beauty & Grooming',
    service: 'Salon & Beauty Content',
    desc: 'Aesthetic-first content that showcases skill, treatments, and glow-ups.',
    deliverables: ['Before/After Hair & Makeup Reels', 'Luxury Interior Aesthetics', 'Stylist Feature Spotlights', 'Seasonal Glow-Up Packages'],
    image: absImg('frontend/public/images/salon.jpg'),
  },
  {
    id: 'education',
    tag: 'Education',
    service: 'Education & Admissions Content',
    desc: 'Trust-building campus content engineered for student admissions.',
    deliverables: ['Campus Walkthrough Videos', 'Admissions Push Campaigns', 'Student & Faculty Spotlights', 'Event & Seminar Highlights'],
    image: absImg('frontend/public/images/education.png'),
  },
  {
    id: 'fashion',
    tag: 'Clothing & Retail',
    service: 'Fashion & Retail Content',
    desc: 'Scroll-stopping model and product content that drives fashion sales.',
    deliverables: ['Seasonal Lookbook Reels', 'Product Styling & Drops', 'Behind-the-Scenes Shoots', 'Influencer-Style Try-Ons'],
    image: absImg('frontend/public/images/fashion.jpg'),
  },
  {
    id: 'creator',
    tag: 'Founders & Creators',
    service: 'Personal Brand / Creator Content',
    desc: 'Authority-building video production for founders, leaders, and creators.',
    deliverables: ['Studio & On-Location Shoots', 'Podcast / Talking-Head Clips', 'Signature Carousel Designs', 'Thought-Leadership Strategy'],
    image: absImg('frontend/public/images/video_production.jpg'),
  },
];

function generateHTML() {
  const cardsHtml = audiences.map((item) => `
    <div class="card">
      <div class="img-box">
        <img class="backdrop" src="file:///${item.image}" alt="" aria-hidden="true" />
        <img class="main-img" src="file:///${item.image}" alt="${item.service}" />
        <div class="top-tag"><span>${item.tag}</span></div>
      </div>
      <div class="meta">
        <div class="meta-header">
          <h3 class="meta-title">${item.service}</h3>
          <div class="arrow-btn">↗</div>
        </div>
        <p class="meta-desc">${item.desc}</p>
        <div class="meta-footer">
          <span class="explore-link">Click for service details &amp; deliverables</span>
        </div>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  :root {
    --color-bg: #09090b;
    --color-bg-secondary: #0e0e11;
    --color-surface: #131316;
    --color-surface-hi: #1a1a1e;
    --color-line: rgba(255, 255, 255, 0.08);
    --color-accent: #ff4d15;
    --color-text-secondary: #a1a1aa;
    --color-text-muted: #71717a;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background-color: var(--color-bg-secondary);
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 60px 20px;
  }
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
  }
  .heading {
    margin-bottom: 40px;
  }
  .eyebrow {
    color: var(--color-accent);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .title {
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .subtitle {
    color: var(--color-text-secondary);
    font-size: 15px;
    margin-top: 8px;
  }

  /* Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }
  @media (min-width: 640px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
  }
  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }
  }

  /* Industry Card */
  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
  }
  .card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 77, 21, 0.4);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 24px rgba(255, 77, 21, 0.12);
  }

  /* Image Box */
  .img-box {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #09090b;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--color-line);
  }
  .img-box .backdrop {
    position: absolute;
    inset: -15px;
    width: calc(100% + 30px);
    height: calc(100% + 30px);
    object-fit: cover;
    filter: blur(20px) brightness(0.35);
    opacity: 0.55;
    pointer-events: none;
  }
  .img-box .main-img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card:hover .main-img {
    transform: scale(1.03);
  }

  .top-tag {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 5;
  }
  .top-tag span {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(9, 9, 11, 0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
  }

  /* Metadata Section */
  .meta {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    gap: 12px;
    background: var(--color-surface);
  }
  .meta-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .meta-title {
    font-size: 17px;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.3;
    transition: color 0.3s ease;
  }
  .card:hover .meta-title {
    color: var(--color-accent);
  }
  .arrow-btn {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--color-line);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    font-size: 14px;
    transition: all 0.3s ease;
  }
  .card:hover .arrow-btn {
    background: var(--color-accent);
    color: #ffffff;
    border-color: var(--color-accent);
    transform: translate(2px, -2px);
  }
  .meta-desc {
    font-size: 13px;
    color: var(--color-text-secondary);
    line-height: 1.55;
  }
  .meta-footer {
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 12px;
  }
  .explore-link {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    transition: color 0.3s;
  }
  .card:hover .explore-link {
    color: var(--color-accent);
  }
</style>
</head>
<body>
  <div class="container">
    <div class="heading">
      <div class="eyebrow">Who We Work With</div>
      <div class="title">Content That Fits Your Business.</div>
      <div class="subtitle">Select your industry to explore specialized creative direction, deliverables, and production strategies.</div>
    </div>
    <div class="grid">
      ${cardsHtml}
    </div>
  </div>
</body>
</html>`;
}

const outHtml = path.resolve('scratch_audiences_final.html');
fs.writeFileSync(outHtml, generateHTML());

const viewports = [
  { name: '1440', w: 1440, h: 1400 },
  { name: '768', w: 768, h: 2200 },
  { name: '390', w: 390, h: 3200 },
];

for (const vp of viewports) {
  const out = path.resolve(`scratch_aud_vp_${vp.name}.png`);
  const cmd = `"${edgePath}" --headless --user-data-dir="${userDir}" --screenshot="${out}" --window-size=${vp.w},${vp.h} "file:///${outHtml.replace(/\\/g, '/')}"`;
  execSync(cmd, { stdio: 'ignore' });
  console.log(`Viewport ${vp.name} screenshot created:`, fs.existsSync(out));
}
