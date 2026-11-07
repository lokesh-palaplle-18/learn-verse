// main.js — LearnVerse 3D Learning Galaxy
// Three.js 0.185.1 via import map

import * as THREE from 'three';
import { SUBJECTS } from './content.js';

// ── Setup ─────────────────────────────────────────────
const canvas = document.getElementById('galaxy-canvas');
let W = window.innerWidth, H = window.innerHeight;
const isMobile = W < 768;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(W, H);
renderer.setClearColor(0x02060F, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x02060F, isMobile ? 0.006 : 0.004);

const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 600);
camera.position.set(0, 2, 55);

const clock = new THREE.Clock();
const mouse = new THREE.Vector2(0, 0);
const raycaster = new THREE.Raycaster();

// ── Lights ─────────────────────────────────────────────
scene.add(new THREE.AmbientLight(0x0a1628, 3));
const sunLight = new THREE.DirectionalLight(0xffffff, 0.6);
sunLight.position.set(10, 20, 30);
scene.add(sunLight);

// ── Stars ──────────────────────────────────────────────
const STAR_COUNT = isMobile ? 4000 : 8000;
(function createStars() {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(STAR_COUNT * 3);
  const sizes = new Float32Array(STAR_COUNT);
  for (let i = 0; i < STAR_COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 500;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 500;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 500;
    sizes[i] = Math.random() * 1.2 + 0.3;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, transparent: true, opacity: 0.75, sizeAttenuation: true });
  const stars = new THREE.Points(geo, mat);
  stars.userData.isStars = true;
  scene.add(stars);
})();

// ── Nebula clouds ──────────────────────────────────────
if (!isMobile) {
  [
    { color: 0x0a1f4a, x: -60, y: 20, z: -50 },
    { color: 0x1a0a3a, x:  50, y: -15, z: -120 },
    { color: 0x0a2a1a, x: -30, y: -10, z: -200 }
  ].forEach(n => {
    const geo = new THREE.PlaneGeometry(140, 100);
    const mat = new THREE.MeshBasicMaterial({ color: n.color, transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(n.x, n.y, n.z);
    mesh.rotation.set(Math.random(), Math.random(), Math.random() * 0.5);
    scene.add(mesh);
  });
}

// ── Planet helpers ─────────────────────────────────────
function glowSphere(radius, color, opacity = 0.18) {
  const geo = new THREE.SphereGeometry(radius * 1.6, 16, 16);
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.BackSide, depthWrite: false });
  return new THREE.Mesh(geo, mat);
}

function makeRing(inner, outer, color, opacity = 0.35) {
  const geo = new THREE.TorusGeometry((inner + outer) / 2, (outer - inner) / 2, 4, 64);
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide });
  return new THREE.Mesh(geo, mat);
}

function makeOrbitLine(radius, color, opacity = 0.12) {
  const pts = [];
  for (let i = 0; i <= 128; i++) {
    const a = (i / 128) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  return new THREE.Line(geo, mat);
}

// ── Build planets ──────────────────────────────────────
const planetGroups = [];
const planetLights = [];
const hoverables = []; // collectible meshes for raycasting

SUBJECTS.forEach((s, idx) => {
  const group = new THREE.Group();
  group.position.set(s.pos.x, s.pos.y, s.pos.z);
  group.userData = { index: idx, id: s.id, color: s.color };

  const col = new THREE.Color(s.color);

  // Point light per planet
  const pLight = new THREE.PointLight(col, 0, 25);
  pLight.position.copy(group.position);
  scene.add(pLight);
  planetLights.push(pLight);

  // ---- Geometry per type ----
  if (s.geo === 'sphere' || s.geo === 'sphere-large') {
    const r = s.r;
    const geo = new THREE.SphereGeometry(r, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.55, metalness: 0.35, emissive: col, emissiveIntensity: 0.12 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { planetIndex: idx, id: s.id };
    group.add(mesh);
    group.add(glowSphere(r, col));
    hoverables.push(mesh);

    // Sine-wave orbital ring (Python special)
    if (s.id === 'python') {
      const ring = makeRing(r + 0.6, r + 1.1, col, 0.4);
      ring.rotation.x = Math.PI / 2 + 0.3;
      group.add(ring);
    }

    // ML — 8 algorithm satellites
    if (s.id === 'ml') {
      s.algorithms.forEach((alg, ai) => {
        const orbitR = 6 + (ai % 3) * 1.2;
        const orbitLine = makeOrbitLine(orbitR, alg.color, 0.08);
        orbitLine.rotation.x = Math.PI / 2 + (ai * 0.15);
        group.add(orbitLine);

        const satGeo = new THREE.SphereGeometry(0.52, 12, 12);
        const satMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(alg.color), roughness: 0.4, metalness: 0.5, emissive: new THREE.Color(alg.color), emissiveIntensity: 0.3 });
        const sat = new THREE.Mesh(satGeo, satMat);
        const angle = (ai / s.algorithms.length) * Math.PI * 2;
        sat.position.set(Math.cos(angle) * orbitR, Math.sin(angle * 0.5) * 1.5, Math.sin(angle) * orbitR);
        sat.userData = { isSatellite: true, algoIndex: ai, planetIndex: idx, orbitR, orbitSpeed: 0.18 + ai * 0.04, orbitAngle: angle, orbitTilt: ai * 0.15 };
        group.add(sat);
        hoverables.push(sat);
      });

      // Unsupervised: particle cluster
      const clusterGeo = new THREE.BufferGeometry();
      const cPos = new Float32Array(60 * 3);
      for (let i = 0; i < 60; i++) {
        cPos[i*3]   = (Math.random()-0.5)*6 + 14;
        cPos[i*3+1] = (Math.random()-0.5)*3;
        cPos[i*3+2] = (Math.random()-0.5)*6;
      }
      clusterGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
      const cMat = new THREE.PointsMaterial({ color: 0xaaaaff, size: 0.25, transparent: true, opacity: 0.6 });
      group.add(new THREE.Points(clusterGeo, cMat));

      // RL: reward star + agent
      const starGeo = new THREE.OctahedronGeometry(0.7, 0);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      const star = new THREE.Mesh(starGeo, starMat);
      star.position.set(-14, 0, 0);
      star.userData.isRewardStar = true;
      group.add(star);

      const agentGeo = new THREE.SphereGeometry(0.35, 8, 8);
      const agentMat = new THREE.MeshBasicMaterial({ color: 0xff6666 });
      const agent = new THREE.Mesh(agentGeo, agentMat);
      agent.userData.isRLAgent = true;
      agent.position.set(-11, 0, 0);
      group.add(agent);
    }

  } else if (s.geo === 'discs') {
    // SQL — stacked cylinders
    for (let d = 0; d < 5; d++) {
      const geo = new THREE.CylinderGeometry(s.r - d * 0.25, s.r - d * 0.25, 0.35, 36);
      const mat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.4, metalness: 0.6, emissive: col, emissiveIntensity: 0.08 * (5 - d) });
      const disc = new THREE.Mesh(geo, mat);
      disc.position.y = d * 0.55 - 1.1;
      disc.userData = { planetIndex: idx, id: s.id, discIdx: d };
      group.add(disc);
      if (d === 0) hoverables.push(disc);
    }
    group.add(glowSphere(s.r + 0.5, col, 0.12));

  } else if (s.geo === 'icosahedron') {
    // AI — wire + solid
    const geo = new THREE.IcosahedronGeometry(s.r, 1);
    const solid = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: col, roughness: 0.3, metalness: 0.7, emissive: col, emissiveIntensity: 0.15, transparent: true, opacity: 0.75 }));
    solid.userData = { planetIndex: idx, id: s.id };
    const wire = new THREE.Mesh(geo.clone(), new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.4 }));
    wire.scale.setScalar(1.06);
    group.add(solid, wire);
    group.add(glowSphere(s.r, col));
    hoverables.push(solid);

  } else if (s.geo === 'torus') {
    // LLM — spinning torus (token ring)
    const geo = new THREE.TorusGeometry(s.r, 0.4, 16, 80);
    const mat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.2, metalness: 0.8, emissive: col, emissiveIntensity: 0.25 });
    const torus = new THREE.Mesh(geo, mat);
    torus.userData = { planetIndex: idx, id: s.id };
    group.add(torus);
    group.add(glowSphere(s.r + 0.5, col, 0.14));
    hoverables.push(torus);
    // Node dots on torus
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      dot.position.set(Math.cos(a) * s.r, Math.sin(a) * s.r, 0);
      group.add(dot);
    }

  } else if (s.geo === 'box') {
    // Prompt — glowing box (cursor)
    const geo = new THREE.BoxGeometry(2, 3, 0.4);
    const mat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.2, metalness: 0.6, emissive: col, emissiveIntensity: 0.3 });
    const box = new THREE.Mesh(geo, mat);
    box.userData = { planetIndex: idx, id: s.id };
    group.add(box);
    group.add(glowSphere(2, col, 0.14));
    hoverables.push(box);

  } else if (s.geo === 'nodes') {
    // RAG — 6 octahedron nodes + connecting lines
    s.ragTypes.forEach((rt, ri) => {
      const angle = (ri / s.ragTypes.length) * Math.PI * 2;
      const nodeR = 3.5;
      const geo = new THREE.OctahedronGeometry(0.65, 0);
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(rt.color), roughness: 0.3, metalness: 0.7, emissive: new THREE.Color(rt.color), emissiveIntensity: 0.25 });
      const node = new THREE.Mesh(geo, mat);
      node.position.set(Math.cos(angle) * nodeR, Math.sin(angle * 0.8) * 1.5, Math.sin(angle) * nodeR);
      node.userData = { planetIndex: idx, id: s.id, ragIdx: ri };
      group.add(node);
      if (ri === 0) hoverables.push(node);

      // Line to center
      const linePts = [new THREE.Vector3(0, 0, 0), node.position.clone()];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
      const lineMat = new THREE.LineBasicMaterial({ color: new THREE.Color(rt.color), transparent: true, opacity: 0.25 });
      group.add(new THREE.Line(lineGeo, lineMat));
    });
    group.add(glowSphere(1.5, col, 0.18));
  }

  scene.add(group);
  planetGroups.push(group);
});

// ── Camera path ────────────────────────────────────────
// Control points: camera starts far, flies through all planets
const camControlPts = [
  new THREE.Vector3(  0,  4,  60),
  new THREE.Vector3( -4,  2,  42),
  new THREE.Vector3(-12,  1,  26),  // ~ Python
  new THREE.Vector3(  4,  0,  12),
  new THREE.Vector3( 12, -1,  -1),  // ~ Java
  new THREE.Vector3( -2,  1, -11),
  new THREE.Vector3(-12,  0, -23),  // ~ SQL
  new THREE.Vector3(  4,  2, -35),
  new THREE.Vector3( 11,  1, -42),  // ~ AI
  new THREE.Vector3( -2,  0, -52),
  new THREE.Vector3( -4, -2, -58),  // ~ ML
  new THREE.Vector3(  4,  0, -68),
  new THREE.Vector3( 12,  1, -74),  // ~ LLM
  new THREE.Vector3( -2,  1, -84),
  new THREE.Vector3(-11,  0, -90),  // ~ Prompt
  new THREE.Vector3(  2,  2, -98),
  new THREE.Vector3(  0,  3,-106),  // ~ RAG
  new THREE.Vector3(  0,  2,-115),
];
const cameraPath = new THREE.CatmullRomCurve3(camControlPts, false, 'catmullrom', 0.5);

// Subject t positions (0–1 along curve) for each planet
const planetT = [0.15, 0.27, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88];

// ── Scroll state ───────────────────────────────────────
let scrollT = 0;       // 0–1 target
let currentT = 0;      // smoothed
let activePlanetIdx = -1;
const lookAtTarget = new THREE.Vector3(0, 0, 0);

function getScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

window.addEventListener('scroll', () => {
  scrollT = getScrollProgress();
  // Determine active planet
  const threshold = 1 / (SUBJECTS.length + 1);
  const newIdx = Math.floor(scrollT / threshold) - 1;
  activePlanetIdx = Math.max(-1, Math.min(newIdx, SUBJECTS.length - 1));
  // nav progress
  const fill = document.getElementById('nav-progress-fill');
  if (fill) fill.style.width = (scrollT * 100).toFixed(1) + '%';
}, { passive: true });

// ── Mouse parallax ─────────────────────────────────────
window.addEventListener('mousemove', e => {
  mouse.x = (e.clientX / W) * 2 - 1;
  mouse.y = -(e.clientY / H) * 2 + 1;
  // Raycaster for planet hover
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(hoverables, false);
  if (hits.length > 0) {
    const hit = hits[0].object;
    document.body.style.cursor = 'pointer';
    // Show satellite info card
    if (hit.userData.isSatellite) {
      showAlgoCard(hit.userData.algoIndex);
    }
  } else {
    document.body.style.cursor = 'default';
    hideAlgoCard();
  }
}, { passive: true });

// ── Click to fly to planet ─────────────────────────────
window.addEventListener('click', () => {
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(hoverables, false);
  if (hits.length > 0) {
    const hit = hits[0].object;
    const idx = hit.userData.planetIndex;
    if (idx !== undefined) flyToPlanet(idx);
  }
});

function flyToPlanet(idx) {
  const sectionId = SUBJECTS[idx].id;
  const el = document.getElementById('section-' + sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Algo card (HTML overlay) ───────────────────────────
let algoCardVisible = false;
function showAlgoCard(algoIdx) {
  const subject = SUBJECTS.find(s => s.id === 'ml');
  if (!subject || !subject.algorithms) return;
  const alg = subject.algorithms[algoIdx];
  const card = document.getElementById('algo-card');
  if (!card || algoCardVisible === algoIdx) return;
  algoCardVisible = algoIdx;
  card.innerHTML = `
    <div style="font-family:'JetBrains Mono',monospace;font-size:0.62rem;letter-spacing:0.15em;color:${alg.color};margin-bottom:0.4rem;text-transform:uppercase">Algorithm</div>
    <div style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.1rem;color:#fff;margin-bottom:0.35rem">${alg.name}</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:0.92rem;padding:0.4rem 0.7rem;background:rgba(0,0,0,0.4);border-radius:6px;margin-bottom:0.7rem;color:${alg.color}">${alg.formula}</div>
    <div style="font-size:0.78rem;color:#64748B;margin-bottom:0.7rem">${alg.use}</div>
    <ol style="padding-left:1rem;font-size:0.76rem;color:rgba(232,240,255,0.7);line-height:1.8">${alg.steps.map(st=>`<li>${st}</li>`).join('')}</ol>
  `;
  card.style.borderColor = alg.color + '55';
  card.style.opacity = '1';
  card.style.transform = 'translateY(0)';
}
function hideAlgoCard() {
  if (algoCardVisible === false) return;
  algoCardVisible = false;
  const card = document.getElementById('algo-card');
  if (card) { card.style.opacity = '0'; card.style.transform = 'translateY(8px)'; }
}

// ── Resize ─────────────────────────────────────────────
window.addEventListener('resize', () => {
  W = window.innerWidth; H = window.innerHeight;
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  renderer.setSize(W, H);
}, { passive: true });

// ── Visibility pause ───────────────────────────────────
let paused = false;
document.addEventListener('visibilitychange', () => { paused = document.hidden; });

// ── Animation loop ─────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);
  if (paused) return;

  const t = clock.getElapsedTime();
  const delta = clock.getDelta ? 0.016 : 0.016;

  // Smooth scroll camera
  currentT += (scrollT - currentT) * 0.035;
  const tClamped = Math.max(0, Math.min(1, currentT));
  const camPt = cameraPath.getPoint(tClamped);
  camera.position.lerp(camPt, 0.05);

  // Subtle mouse parallax on camera (gentle, not disorienting)
  camera.position.x += mouse.x * 0.4;
  camera.position.y += mouse.y * 0.2;

  // Camera lookAt
  if (activePlanetIdx >= 0 && activePlanetIdx < planetGroups.length) {
    lookAtTarget.lerp(planetGroups[activePlanetIdx].position, 0.04);
  } else {
    const fwdPt = cameraPath.getPoint(Math.min(tClamped + 0.08, 1));
    lookAtTarget.lerp(fwdPt, 0.04);
  }
  camera.lookAt(lookAtTarget);

  // Animate planets
  planetGroups.forEach((group, idx) => {
    const s = SUBJECTS[idx];
    const isActive = idx === activePlanetIdx;

    // Idle rotation
    group.rotation.y = t * 0.12 + idx * 0.7;
    if (s.geo === 'discs') group.rotation.y = 0;

    // Active glow / dim
    const targetIntensity = isActive ? 6 : 0.8;
    planetLights[idx].intensity += (targetIntensity - planetLights[idx].intensity) * 0.06;
    planetLights[idx].distance = isActive ? 35 : 20;

    // Scale pulse on active
    const targetScale = isActive ? 1.12 : 0.95;
    group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

    // ML: orbit satellites
    if (s.id === 'ml' && s.algorithms) {
      group.children.forEach(child => {
        if (child.userData && child.userData.isSatellite) {
          child.userData.orbitAngle += child.userData.orbitSpeed * 0.012;
          const a = child.userData.orbitAngle;
          const r = child.userData.orbitR;
          const tilt = child.userData.orbitTilt;
          child.position.set(
            Math.cos(a) * r,
            Math.sin(a + tilt) * 1.8,
            Math.sin(a) * r
          );
          // Pulse glow
          child.material.emissiveIntensity = 0.2 + Math.sin(t * 2 + child.userData.algoIndex) * 0.15;
        }
        if (child.userData && child.userData.isRewardStar) {
          child.rotation.y = t * 1.5;
          child.rotation.z = t * 0.8;
        }
        if (child.userData && child.userData.isRLAgent) {
          const ag = t * 0.6;
          child.position.set(Math.cos(ag) * 4 - 14, Math.sin(ag * 0.7) * 1.2, Math.sin(ag) * 4);
        }
      });
    }

    // LLM torus spin
    if (s.geo === 'torus' && group.children[0]) {
      group.children[0].rotation.x = t * 0.5;
      group.children[0].rotation.z = t * 0.3;
    }

    // Prompt box blink / bob
    if (s.geo === 'box' && group.children[0]) {
      group.children[0].position.y = Math.sin(t * 2) * 0.3;
      group.children[0].material.emissiveIntensity = 0.2 + Math.sin(t * 4) * 0.15;
    }

    // SQL discs spin at different rates
    if (s.geo === 'discs') {
      group.children.forEach((c, ci) => {
        if (c.isMesh && c.userData.discIdx !== undefined) {
          c.rotation.y = t * (0.15 + ci * 0.08) * (ci % 2 === 0 ? 1 : -1);
        }
      });
    }

    // AI icosahedron pulse scale
    if (s.geo === 'icosahedron' && group.children[0]) {
      const pulse = 1 + Math.sin(t * 2 + idx) * 0.05;
      group.children[0].scale.setScalar(pulse);
      group.children[0].material.emissiveIntensity = 0.1 + Math.sin(t * 2) * 0.08;
    }

    // RAG nodes: pulse + color cycle
    if (s.geo === 'nodes') {
      group.children.forEach(child => {
        if (child.isMesh && child.userData.ragIdx !== undefined) {
          child.rotation.y = t * 1.2;
          child.rotation.x = t * 0.7;
          const sc = 1 + Math.sin(t * 2 + child.userData.ragIdx * 1.1) * 0.08;
          child.scale.setScalar(sc);
        }
      });
    }
  });

  // Stars parallax
  scene.children.forEach(obj => {
    if (obj.userData.isStars) {
      obj.rotation.y = t * 0.0015;
      obj.rotation.x = mouse.y * 0.01;
    }
  });

  renderer.render(scene, camera);
}

animate();

// ── Roadmap fly-to ─────────────────────────────────────
window.flyToPlanetById = function(id) {
  const idx = SUBJECTS.findIndex(s => s.id === id);
  if (idx >= 0) flyToPlanet(idx);
};
