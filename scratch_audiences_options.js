import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDir = path.resolve('scratch_edge_temp');
const absImg = (rel) => path.resolve(rel).replace(/\\/g, '/');

const items = [
  {
    category: 'Food & Hospitality',
    service: 'Restaurant & Café Content',
    desc: 'Mouth-watering visuals and story content that fill tables.',
    image: absImg('frontend/public/images/cafe.jpg'),
  },
  {
    category: 'Gyms & Studios',
    service: 'Fitness & Wellness Content',
    desc: 'High-energy reels and transformation-driven storytelling.',
    image: absImg('frontend/public/images/fitness.jpg'),
  },
  {
    category: 'Beauty & Grooming',
    service: 'Salon & Beauty Content',
    desc: 'Aesthetic-first content that showcases skill and results.',
    image: absImg('frontend/public/images/salon.jpg'),
  },
  {
    category: 'Education',
    service: 'Education & Admissions Content',
    desc: 'Trust-building content for admissions and community.',
    image: absImg('frontend/public/images/education.png'),
  },
  {
    category: 'Clothing & Retail',
    service: 'Fashion & Retail Content',
    desc: 'Scroll-stopping product content that drives conversions.',
    image: absImg('frontend/public/images/fashion.jpg'),
  },
  {
    category: 'Founders & Creators',
    service: 'Personal Brand / Creator Content',
    desc: 'Positioning-led content that builds authority fast.',
    image: absImg('frontend/public/images/video_production.jpg'),
  },
];

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  :root {
    --color-bg: #09090b;
    --color-surface: #131316;
    --color-surface-hi: #1a1a1e;
    --color-line: rgba(255, 255, 255, 0.08);
    --color-accent: #ff4d15;
    --color-text-secondary: #a1a1aa;
    --color-text-muted: #6b7280;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background-color: var(--color-bg);
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 40px;
  }
  h2 {
    color: var(--color-accent);
    font-size: 18px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 40px 0 20px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 60px;
  }

  /* ------------------- OPTION 1: Dedicated Meta Footer Below Image ------------------- */
  .card-opt1 {
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
    display: flex;
    flex-direction: column;
  }
  .card-opt1:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 77, 21, 0.4);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5), 0 0 24px rgba(255, 77, 21, 0.12);
  }
  .card-opt1 .img-box {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #0d0d10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-opt1 .backdrop {
    position: absolute;
    inset: -15px;
    width: calc(100% + 30px);
    height: calc(100% + 30px);
    object-fit: cover;
    filter: blur(20px) brightness(0.35);
    opacity: 0.5;
  }
  .card-opt1 .main-img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card-opt1:hover .main-img {
    transform: scale(1.03);
  }
  .card-opt1 .badge {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 5;
    background: rgba(9, 9, 11, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
  }
  .card-opt1 .meta {
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: var(--color-surface);
    border-top: 1px solid var(--color-line);
  }
  .card-opt1 .meta-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-opt1 .meta-service {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    transition: color 0.3s;
  }
  .card-opt1:hover .meta-service {
    color: var(--color-accent);
  }
  .card-opt1 .meta-action {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--color-accent);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .card-opt1 .meta-desc {
    font-size: 13px;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }

  /* ------------------- OPTION 2: Floating Bar Over Bottom ------------------- */
  .card-opt2 {
    position: relative;
    aspect-ratio: 4 / 3;
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  }
  .card-opt2:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 77, 21, 0.4);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5), 0 0 24px rgba(255, 77, 21, 0.12);
  }
  .card-opt2 .backdrop {
    position: absolute;
    inset: -15px;
    width: calc(100% + 30px);
    height: calc(100% + 30px);
    object-fit: cover;
    filter: blur(20px) brightness(0.35);
    opacity: 0.5;
  }
  .card-opt2 .main-img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card-opt2:hover .main-img {
    transform: scale(1.03);
  }
  .card-opt2 .glass-bar {
    position: absolute;
    bottom: 12px;
    left: 12px;
    right: 12px;
    z-index: 10;
    background: rgba(14, 14, 17, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.3s;
  }
  .card-opt2:hover .glass-bar {
    background: rgba(19, 19, 22, 0.95);
    border-color: rgba(255, 77, 21, 0.3);
  }
  .card-opt2 .bar-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .card-opt2 .bar-cat {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-accent);
    font-weight: 600;
  }
  .card-opt2 .bar-title {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
  }
  .card-opt2 .bar-arrow {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 14px;
    transition: background 0.3s, transform 0.3s, color 0.3s;
  }
  .card-opt2:hover .bar-arrow {
    background: var(--color-accent);
    color: #ffffff;
    transform: translate(2px, -2px);
  }
</style>
</head>
<body>
  <h2>Option 1: Clean Architectural Card (Image Container + Dedicated Metadata Below)</h2>
  <div class="grid">
    ${items.map(item => `
      <div class="card-opt1">
        <div class="img-box">
          <img class="backdrop" src="file:///${item.image}" alt="" />
          <img class="main-img" src="file:///${item.image}" alt="${item.service}" />
          <span class="badge">${item.category}</span>
        </div>
        <div class="meta">
          <div class="meta-top">
            <span class="meta-service">${item.service}</span>
            <span class="meta-action">Explore ↗</span>
          </div>
          <p class="meta-desc">${item.desc}</p>
        </div>
      </div>
    `).join('')}
  </div>

  <h2>Option 2: Cinematic Aspect Card with Integrated Floating Glass Bar</h2>
  <div class="grid">
    ${items.map(item => `
      <div class="card-opt2">
        <img class="backdrop" src="file:///${item.image}" alt="" />
        <img class="main-img" src="file:///${item.image}" alt="${item.service}" />
        <div class="glass-bar">
          <div class="bar-text">
            <span class="bar-cat">${item.category}</span>
            <span class="bar-title">${item.service}</span>
          </div>
          <div class="bar-arrow">↗</div>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

const outHtml = path.resolve('scratch_audiences_options.html');
fs.writeFileSync(outHtml, html);

const outPng = path.resolve('scratch_audiences_options.png');
const cmd = `"${edgePath}" --headless --user-data-dir="${userDir}" --screenshot="${outPng}" --window-size=1440,2400 "file:///${outHtml.replace(/\\/g, '/')}"`;
execSync(cmd, { stdio: 'ignore' });
console.log('Done screenshot, exists:', fs.existsSync(outPng));
