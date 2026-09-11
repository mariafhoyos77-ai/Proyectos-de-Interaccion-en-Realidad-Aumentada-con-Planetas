import * as THREE from "three";

const cache = new Map<string, THREE.Texture>();

function makeSeed(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return { c, ctx: c.getContext("2d")! };
}

function finish(c: HTMLCanvasElement, key: string) {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  cache.set(key, tex);
  return tex;
}

// ---------------------------------------------------------------------------
// SUN — granulated fiery surface
// ---------------------------------------------------------------------------
function makeSun() {
  const w = 512;
  const h = 256;
  const { c, ctx } = canvas(w, h);
  const rand = makeSeed(77);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#ffcf5a");
  g.addColorStop(0.5, "#ff9b2e");
  g.addColorStop(1, "#ffcf5a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // granules
  for (let i = 0; i < 2600; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = rand() * 5 + 1;
    const bright = rand();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = bright > 0.6 ? "rgba(255,255,200,0.5)" : "rgba(180,60,10,0.35)";
    ctx.fill();
  }
  // sunspots
  for (let i = 0; i < 10; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = rand() * 10 + 3;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(60,20,0,0.8)");
    grad.addColorStop(1, "rgba(60,20,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return finish(c, "sun");
}

// ---------------------------------------------------------------------------
// PLANET TEXTURES
// ---------------------------------------------------------------------------
function drawBands(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: string,
  color2: string,
  rand: () => number,
) {
  for (let y = 0; y < h; y += 2) {
    const t = y / h;
    const wob = Math.sin(t * 20 + rand() * 6) * 0.5 + Math.sin(t * 45) * 0.3;
    let col = color;
    let alpha = 0.45;
    if (rand() > 0.6) {
      col = color2;
      alpha = 0.5;
    }
    ctx.fillStyle = col;
    if (alpha < 1) {
      ctx.globalAlpha = alpha + Math.abs(wob) * 0.3;
    }
    ctx.fillRect(0, y, w, 2.4);
  }
  ctx.globalAlpha = 1;
}

function drawCraters(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number,
  color: string,
  color2: string,
) {
  ctx.globalAlpha = 0.5;
  for (let i = 0; i < 260; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = rand() * 9 + 1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = rand() > 0.5 ? color : color2;
    ctx.fill();
    if (r > 4) {
      ctx.beginPath();
      ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function drawEarth(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number,
) {
  // ocean gradient
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#123a80");
  g.addColorStop(0.5, "#2f6fdd");
  g.addColorStop(1, "#123a80");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // continents
  const blobs = 24;
  for (let i = 0; i < blobs; i++) {
    const cx = rand() * w;
    const cy = rand() * h;
    const size = rand() * 40 + 20;
    ctx.fillStyle =
      i % 3 === 1 ? "#2e8b57" : i % 3 === 2 ? "#3f9149" : "#2f7a3d";
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 2; a += 0.3) {
      const r = size * (0.6 + rand() * 0.7);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r * 0.6;
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
  // polar caps
  ctx.fillStyle = "rgba(240,250,255,0.95)";
  ctx.fillRect(0, 0, w, h * 0.09);
  ctx.fillRect(0, h - h * 0.09, w, h * 0.09);
  // clouds
  ctx.globalAlpha = 0.4;
  for (let i = 0; i < 90; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = rand() * 26 + 8;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function getPlanetTexture(
  color: string,
  color2: string,
  type: string,
  seed: number,
): THREE.Texture {
  const key = `planet-${type}-${color}-${color2}-${seed}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const w = 512;
  const h = 256;
  const { c, ctx } = canvas(w, h);
  const rand = makeSeed(seed);

  if (type === "earth") {
    drawEarth(ctx, w, h, rand);
  } else if (type === "gas") {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, color2);
    g.addColorStop(0.5, color);
    g.addColorStop(1, color2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    drawBands(ctx, w, h, color, color2, rand);
    // great red spot for jupiter-like base
    if (seed === 5) {
      const grad = ctx.createRadialGradient(w * 0.68, h * 0.6, 2, w * 0.68, h * 0.6, 26);
      grad.addColorStop(0, "rgba(200,80,40,0.9)");
      grad.addColorStop(1, "rgba(200,80,40,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(w * 0.68, h * 0.6, 26, 16, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === "rocky") {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, color2);
    g.addColorStop(0.5, color);
    g.addColorStop(1, color2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    drawCraters(ctx, w, h, rand, color2, "rgba(20,20,20,0.4)");
  } else if (type === "ice") {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, color2);
    g.addColorStop(0.5, color);
    g.addColorStop(1, color2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 0.35;
    for (let i = 0; i < 40; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const r = rand() * 30 + 8;
      ctx.fillStyle = rand() > 0.5 ? "#ffffff" : color2;
      ctx.beginPath();
      ctx.ellipse(x, y, r * 0.4, r * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  return finish(c, key);
}

// ---------------------------------------------------------------------------
// GLOW SPRITE (radial gradient)
// ---------------------------------------------------------------------------
function makeGlow(): THREE.Texture {
  const hit = cache.get("glow");
  if (hit) return hit;
  const s = 256;
  const { c, ctx } = canvas(s, s);
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(0.6, "rgba(255,255,255,0.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return finish(c, "glow");
}

// ---------------------------------------------------------------------------
// MILKY WAY — galaxy band with stars + nebula, wrapped on a big sphere
// ---------------------------------------------------------------------------
function makeMilkyWay(): THREE.Texture {
  const hit = cache.get("milkyway");
  if (hit) return hit;
  const w = 2048;
  const h = 1024;
  const { c, ctx } = canvas(w, h);
  ctx.fillStyle = "#02030a";
  ctx.fillRect(0, 0, w, h);

  // faint stars across the whole sky
  const rand = makeSeed(1234);
  for (let i = 0; i < 16000; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = rand() * 1.2 + 0.2;
    const a = rand() * 0.7 + 0.1;
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // the galactic band (dense, billowing)
  const bandY = h * 0.5;
  for (let i = 0; i < 6; i++) {
    const gy = bandY + (rand() - 0.5) * h * 0.25 * i;
    const grad = ctx.createLinearGradient(0, gy - 80, 0, gy + 80);
    grad.addColorStop(0, "rgba(90,110,180,0)");
    grad.addColorStop(0.5, i % 2 ? "rgba(150,160,220,0.5)" : "rgba(190,180,240,0.45)");
    grad.addColorStop(1, "rgba(90,110,180,0)");
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = grad;
    ctx.fillRect(0, gy - 80, w, 160);
  }
  ctx.globalAlpha = 1;

  // dense stars along the band
  for (let i = 0; i < 24000; i++) {
    const x = rand() * w;
    const y = bandY + (rand() - 0.5) * (rand() * 140);
    const r = rand() * 1.4 + 0.2;
    const a = rand() * 0.8 + 0.15;
    const hue = rand() > 0.7 ? "200,210,255" : "255,255,255";
    ctx.fillStyle = `rgba(${hue},${a})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // nebula clouds
  for (let i = 0; i < 26; i++) {
    const x = rand() * w;
    const y = bandY + (rand() - 0.5) * 220;
    const r = rand() * 90 + 30;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    const col = rand() > 0.5 ? "120,80,180" : "60,110,180";
    grad.addColorStop(0, `rgba(${col},0.18)`);
    grad.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  return finish(c, "milkyway");
}

export function getSunTexture(): THREE.Texture {
  return cache.get("sun") ?? makeSun();
}

export function getPlanetTextureFor(
  color: string,
  color2: string,
  type: string,
  seed: number,
): THREE.Texture {
  return (
    cache.get(`planet-${type}-${color}-${color2}-${seed}`) ??
    getPlanetTexture(color, color2, type, seed)
  );
}

export function getGlowTexture(): THREE.Texture {
  return cache.get("glow") ?? makeGlow();
}

export function getMilkyWayTexture(): THREE.Texture {
  return cache.get("milkyway") ?? makeMilkyWay();
}

// ---------------------------------------------------------------------------
// RING — banded radial texture for planetary rings
// ---------------------------------------------------------------------------
function makeRing(color: string) {
  const key = `ring-${color}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const size = 512;
  const { c, ctx } = canvas(size, size);
  const rand = makeSeed(4242);
  const cx = size / 2;
  const cy = size / 2;
  ctx.clearRect(0, 0, size, size);
  for (let r = size / 2; r > 0; r -= 1) {
    const norm = r / (size / 2); // 1 = edge, 0 = centre
    let a = 0.15 + ((Math.sin(norm * 46) + 1) / 2) * 0.4;
    a += rand() * 0.18;
    // clear gaps (Cassini-like divisions)
    if (Math.abs(norm - 0.46) < 0.025) a *= 0.15;
    if (Math.abs(norm - 0.66) < 0.03) a *= 0.2;
    if (Math.abs(norm - 0.84) < 0.02) a *= 0.25;
    ctx.strokeStyle = makeRGBA(color, Math.min(1, a));
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  return finish(c, key);
}

function makeRGBA(hex: string, alpha: number) {
  const c = new THREE.Color(hex);
  return `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(
    c.b * 255,
  )},${alpha})`;
}

export function getRingTexture(color: string): THREE.Texture {
  return cache.get(`ring-${color}`) ?? makeRing(color);
}
