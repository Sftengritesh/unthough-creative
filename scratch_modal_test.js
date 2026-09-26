import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDir = path.resolve('scratch_edge_temp');
const absImg = (rel) => path.resolve(rel).replace(/\\/g, '/');

const cafe = {
  id: 'cafe',
  tag: 'Food & Hospitality',
  service: 'Restaurant & Café Content',
  desc: 'Mouth-watering visuals, ambience shoots, and story content that fill tables.',
  strategy: 'We capture the sizzle, plating, and aesthetic ambience of your dining room to trigger cravings and convert local viewers into dine-in customers.',
  deliverables: [
    'Ambience & Interior Walkthroughs',
    'Viral Food Plating & Recipe Reels',
    'Daily Table Reservation Stories',
    'New Menu Launch Campaigns',
    'Weekly On-Site Food Shoots',
    'Customer Review & Buzz Content',
  ],
  image: absImg('frontend/public/images/cafe.jpg'),
};

const modalHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  :root {
    --color-bg: #09090b;
    --color-surface: #131316;
    --color-surface-hi: #1a1a1e;
    --color-line: rgba(255, 255, 255, 0.08);
    --color-accent: #ff4d15;
    --color-text-secondary: #a1a1aa;
    --color-text-muted: #71717a;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: rgba(0, 0, 0, 0.85);
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .modal {
    position: relative;
    width: 100%;
    max-width: 760px;
    background: #111114;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.85);
  }
  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 20;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(9, 9, 11, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
  }
  .image-stage {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: #09090b;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--color-line);
  }
  .image-stage .backdrop {
    position: absolute;
    inset: -20px;
    width: calc(100% + 40px);
    height: calc(100% + 40px);
    object-fit: cover;
    filter: blur(24px) brightness(0.35);
    opacity: 0.6;
  }
  .image-stage .main-img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .modal-body {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .tag-pill {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 999px;
    background: rgba(255, 77, 21, 0.12);
    border: 1px solid rgba(255, 77, 21, 0.25);
    color: var(--color-accent);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .modal-title {
    font-size: 24px;
    font-weight: 700;
    margin-top: 6px;
  }
  .modal-desc {
    color: var(--color-text-secondary);
    font-size: 14px;
    line-height: 1.6;
    margin-top: 4px;
  }
  .section-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    font-weight: 600;
    margin-bottom: 10px;
  }
  .deliverables-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @media (max-width: 500px) {
    .deliverables-grid { grid-template-columns: 1fr; }
  }
  .del-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 13px;
    color: #e4e4e7;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .del-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-accent);
    flex-shrink: 0;
  }
  .modal-footer {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 10px;
    border-top: 1px solid var(--color-line);
  }
  .btn-primary {
    background: var(--color-accent);
    color: #ffffff;
    padding: 12px 24px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .btn-secondary {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--color-line);
    color: #ffffff;
    padding: 12px 20px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
</style>
</head>
<body>
  <div class="modal">
    <div class="close-btn">✕</div>
    <div class="image-stage">
      <img class="backdrop" src="file:///${cafe.image}" alt="" />
      <img class="main-img" src="file:///${cafe.image}" alt="${cafe.service}" />
    </div>
    <div class="modal-body">
      <div>
        <span class="tag-pill">${cafe.tag}</span>
        <h2 class="modal-title">${cafe.service}</h2>
        <p class="modal-desc">${cafe.strategy}</p>
      </div>
      <div>
        <div class="section-label">Core Deliverables &amp; Content Package</div>
        <div class="deliverables-grid">
          ${cafe.deliverables.map(d => `<div class="del-item"><span class="del-dot"></span>${d}</div>`).join('')}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-primary">Discuss a ${cafe.tag} Project ↗</button>
        <button class="btn-secondary">Chat on WhatsApp ↗</button>
      </div>
    </div>
  </div>
</body>
</html>`;

const outHtml = path.resolve('scratch_modal.html');
fs.writeFileSync(outHtml, modalHtml);
const outPng = path.resolve('scratch_modal.png');
const cmd = `"${edgePath}" --headless --user-data-dir="${userDir}" --screenshot="${outPng}" --window-size=1024,1200 "file:///${outHtml.replace(/\\/g, '/')}"`;
execSync(cmd, { stdio: 'ignore' });
console.log('Done modal screenshot:', fs.existsSync(outPng));
