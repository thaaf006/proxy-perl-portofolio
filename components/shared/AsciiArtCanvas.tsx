"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type RenderMode =
  | "characters" | "dither" | "mosaic" | "pixel" | "dots" | "cross"
  | "diamond" | "voxel" | "lego" | "mixed" | "lines" | "diagonal"
  | "braille" | "disco" | "hexdump" | "matrix" | "rings" | "hearts"
  | "stars" | "hexagons" | "triangles" | "bubbles" | "hatch" | "contour"
  | "halfblocks";

const config = {
  source: "/gallery/documentation-05.jpg",
  renderMode: "contour" as RenderMode,
  bgOpacity: 0.39,
  cellSize: 15,
  coverage: 1,
  density: 1,
  invert: false,
  brightness: -100,
  contrast: -2,
  saturation: 1,
  grayscale: 0.2,
  tint: "#0f172a",
  tintOpacity: 0.7,
  animated: false,
  animSpeed: 0.8,
  animIntensity: 0.7,
};

const PRE_RENDERED_FRAME_COUNT = 1;
const FRAME_DURATION = 80;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function hexColor(hex: string) {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function fitImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  ctx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawPolygon(ctx: CanvasRenderingContext2D, points: [number, number][]) {
  ctx.beginPath();
  points.forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.closePath();
  ctx.fill();
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  mode: RenderMode,
  x: number,
  y: number,
  size: number,
  tone: number,
  wave: number,
) {
  const half = size / 2;
  const amount = clamp(tone);
  const radius = Math.max(1, half * (0.2 + amount * 0.76));
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(wave * 0.12);
  ctx.lineWidth = Math.max(0.7, size * 0.075);

  switch (mode) {
    case "contour": {
      const bands = Math.max(1, Math.round(amount * 4));
      ctx.strokeStyle = `rgba(139, 170, 255, ${0.18 + amount * 0.8})`;
      for (let band = 0; band < bands; band += 1) {
        const r = radius * (0.38 + band / (bands * 1.6));
        ctx.beginPath();
        ctx.arc(0, 0, r, wave + band * 0.7, Math.PI * 1.45 + wave + band * 0.7);
        ctx.stroke();
      }
      break;
    }
    case "characters":
    case "hexdump":
    case "matrix": {
      const chars = mode === "hexdump" ? "0123456789abcdef" : mode === "matrix" ? "01アイウエオ" : " .:+*#%@";
      ctx.font = `${Math.max(8, size * (0.7 + amount * 0.8))}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = mode === "matrix" ? `rgba(79, 255, 151, ${0.3 + amount * 0.7})` : "#d9e4ff";
      ctx.fillText(chars[Math.floor(amount * (chars.length - 1))], 0, 0);
      break;
    }
    case "lines":
    case "diagonal":
    case "hatch": {
      ctx.strokeStyle = `rgba(169, 190, 255, ${0.22 + amount * 0.7})`;
      for (let line = -half; line <= half; line += Math.max(3, size / 4)) {
        ctx.beginPath();
        if (mode === "lines") ctx.moveTo(-half, line); else ctx.moveTo(line, -half);
        ctx.lineTo(half, mode === "lines" ? line : half);
        ctx.stroke();
        if (mode === "hatch") {
          ctx.beginPath(); ctx.moveTo(-half, -line); ctx.lineTo(half, line); ctx.stroke();
        }
      }
      break;
    }
    case "cross":
      ctx.strokeStyle = `rgba(180, 202, 255, ${0.3 + amount * 0.65})`;
      ctx.beginPath(); ctx.moveTo(-radius, 0); ctx.lineTo(radius, 0); ctx.moveTo(0, -radius); ctx.lineTo(0, radius); ctx.stroke();
      break;
    case "diamond":
      ctx.fillStyle = `rgba(173, 196, 255, ${0.2 + amount * 0.75})`;
      drawPolygon(ctx, [[0, -radius], [radius, 0], [0, radius], [-radius, 0]]);
      break;
    case "triangles":
      ctx.fillStyle = `rgba(156, 182, 255, ${0.2 + amount * 0.72})`;
      drawPolygon(ctx, [[0, -radius], [radius, radius], [-radius, radius]]);
      break;
    case "hexagons":
      ctx.fillStyle = `rgba(143, 174, 255, ${0.18 + amount * 0.76})`;
      drawPolygon(ctx, Array.from({ length: 6 }, (_, i) => {
        const angle = i * Math.PI / 3;
        return [Math.cos(angle) * radius, Math.sin(angle) * radius] as [number, number];
      }));
      break;
    case "halfblocks":
      ctx.fillStyle = `rgba(177, 202, 255, ${0.2 + amount * 0.75})`;
      ctx.fillRect(-half, amount > 0.5 ? -half : 0, size, half);
      break;
    case "hearts":
      ctx.fillStyle = `rgba(224, 139, 210, ${0.2 + amount * 0.7})`;
      ctx.font = `${Math.max(10, size)}px serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("♥", 0, 1);
      break;
    case "stars":
      ctx.fillStyle = `rgba(229, 238, 255, ${0.2 + amount * 0.75})`;
      drawPolygon(ctx, Array.from({ length: 10 }, (_, i) => {
        const angle = -Math.PI / 2 + i * Math.PI / 5;
        const r = i % 2 ? radius * 0.4 : radius;
        return [Math.cos(angle) * r, Math.sin(angle) * r] as [number, number];
      }));
      break;
    default: {
      ctx.fillStyle = `rgba(150, 185, 255, ${0.14 + amount * 0.78})`;
      if (mode === "dots" || mode === "bubbles" || mode === "rings") {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        if (mode === "rings") ctx.stroke(); else ctx.fill();
      } else if (mode === "pixel" || mode === "mosaic" || mode === "lego" || mode === "voxel") {
        ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
      } else {
        ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
      }
    }
  }
  ctx.restore();
}

export function AsciiArtCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const image = new Image();
    let animationFrame = 0;
    let resizeFrame = 0;
    let lastDraw = 0;
    let scrollResume: ReturnType<typeof setTimeout> | undefined;
    let visible = true;
    let disposed = false;
    let scene: {
      width: number;
      height: number;
      background: HTMLCanvasElement;
      frames: HTMLCanvasElement[];
    } | null = null;

    const buildScene = () => {
      if (disposed || !image.complete || !image.naturalWidth) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width; canvas.height = height;
      }
      const w = rect.width;
      const h = rect.height;
      const source = document.createElement("canvas");
      source.width = Math.max(1, Math.floor(w)); source.height = Math.max(1, Math.floor(h));
      const sourceContext = source.getContext("2d");
      if (!sourceContext) return;
      sourceContext.fillStyle = "#0f172a"; sourceContext.fillRect(0, 0, w, h);
      fitImage(sourceContext, image, w, h);
      const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data;

      const background = document.createElement("canvas");
      background.width = source.width; background.height = source.height;
      const backgroundContext = background.getContext("2d");
      if (!backgroundContext) return;
      backgroundContext.fillStyle = "#0b1020"; backgroundContext.fillRect(0, 0, w, h);
      backgroundContext.save();
      backgroundContext.globalAlpha = config.bgOpacity;
      backgroundContext.filter = "blur(12px) saturate(0.65)";
      fitImage(backgroundContext, image, w, h);
      backgroundContext.restore();

      const cols = Math.ceil(w / config.cellSize);
      const rows = Math.ceil(h / config.cellSize);
      const tint = hexColor(config.tint);
      const cells: Array<{ x: number; y: number; tone: number; size: number; color: string }> = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          let red = 0, green = 0, blue = 0, count = 0;
          for (let py = row * config.cellSize; py < Math.min(source.height, (row + 1) * config.cellSize); py += 2) {
            for (let px = col * config.cellSize; px < Math.min(source.width, (col + 1) * config.cellSize); px += 2) {
              const index = (py * source.width + px) * 4;
              red += pixels[index]; green += pixels[index + 1]; blue += pixels[index + 2]; count += 1;
            }
          }
          const r = count ? red / count : 0, g = count ? green / count : 0, b = count ? blue / count : 0;
          let value = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
          value = config.invert ? 1 - value : value;
          value = clamp((value - 0.5) * (1 + config.contrast / 100) + 0.5 + config.brightness / 500);
          value = value * (1 - config.grayscale * 0.18) + 0.5 * config.grayscale * 0.18;
          if (Math.random() > config.coverage || value < 0.02) continue;
          const x = col * config.cellSize + config.cellSize / 2;
          const y = row * config.cellSize + config.cellSize / 2;
          const alpha = 0.36 + value * 0.64;
          const color = `rgba(${Math.round(tint[0] + (205 - tint[0]) * value)}, ${Math.round(tint[1] + (221 - tint[1]) * value)}, ${Math.round(tint[2] + (255 - tint[2]) * value)}, ${alpha})`;
          cells.push({ x, y, tone: value, size: config.cellSize * config.density, color });
        }
      }

      const overlay = backgroundContext.createRadialGradient(w / 2, h * 0.45, Math.min(w, h) * 0.1, w / 2, h * 0.5, Math.max(w, h) * 0.72);
      backgroundContext.save();
      backgroundContext.globalCompositeOperation = "screen";
      backgroundContext.globalAlpha = 0.07;
      for (let y = 0; y < h; y += 4) { backgroundContext.fillStyle = "#9bbcff"; backgroundContext.fillRect(0, y, w, 1); }
      backgroundContext.restore();
      const vignette = overlay;
      vignette.addColorStop(0, "transparent"); vignette.addColorStop(1, "rgba(0, 0, 0, 0.82)");
      backgroundContext.fillStyle = vignette; backgroundContext.fillRect(0, 0, w, h);

      const frames = Array.from({ length: PRE_RENDERED_FRAME_COUNT }, () => {
        const frame = document.createElement("canvas");
        frame.width = source.width;
        frame.height = source.height;
        return frame;
      });
      frames.forEach((frame, frameIndex) => {
        const frameContext = frame.getContext("2d");
        if (!frameContext) return;
        const frameTime = frameIndex / PRE_RENDERED_FRAME_COUNT * Math.PI * 2;
        frameContext.save();
        frameContext.filter = "blur(12px)";
        frameContext.globalCompositeOperation = "screen";
        frameContext.globalAlpha = 0.24;
        for (const cell of cells) {
          const col = cell.x / config.cellSize;
          const row = cell.y / config.cellSize;
          const wave = Math.sin(col * 0.38 + row * 0.22 - frameTime) * config.animIntensity;
          frameContext.fillStyle = cell.color;
          frameContext.strokeStyle = cell.color;
          drawShape(frameContext, config.renderMode, cell.x, cell.y + wave * 1.8, cell.size, cell.tone, wave);
        }
        frameContext.restore();
        for (const cell of cells) {
          const col = cell.x / config.cellSize;
          const row = cell.y / config.cellSize;
          const wave = Math.sin(col * 0.38 + row * 0.22 - frameTime) * config.animIntensity;
          frameContext.fillStyle = cell.color;
          frameContext.strokeStyle = cell.color;
          drawShape(frameContext, config.renderMode, cell.x, cell.y + wave * 1.8, cell.size, cell.tone, wave);
        }
      });
      scene = { width: w, height: h, background, frames };
      render(0, true);
    };

    const render = (time = 0, force = false) => {
      if (disposed || !scene) return;
      if (!force && time - lastDraw < 32) {
        if (!reduced && config.animated && visible) animationFrame = requestAnimationFrame(render);
        return;
      }
      lastDraw = time;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width: w, height: h, background, frames } = scene;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, w, h);
      context.drawImage(background, 0, 0, w, h);
      const frameIndex = reduced || !config.animated
        ? 0
        : Math.floor(time * config.animSpeed / FRAME_DURATION) % frames.length;
      context.drawImage(frames[frameIndex], 0, 0, w, h);

      if (!reduced && config.animated && visible) animationFrame = requestAnimationFrame(render);
    };

    const scheduleBuild = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        buildScene();
        if (visible && !reduced && config.animated) {
          cancelAnimationFrame(animationFrame);
          animationFrame = requestAnimationFrame(render);
        }
      });
    };
    image.onload = scheduleBuild;
    image.src = config.source;
    const onScroll = () => {
      cancelAnimationFrame(animationFrame);
      if (scrollResume) clearTimeout(scrollResume);
      scrollResume = setTimeout(() => {
        if (visible && !reduced && config.animated) animationFrame = requestAnimationFrame(render);
      }, 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(scheduleBuild);
    observer.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(animationFrame);
      if (visible && !reduced && config.animated) animationFrame = requestAnimationFrame(render);
    }, { threshold: 0.01 });
    visibilityObserver.observe(canvas);
    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (scrollResume) clearTimeout(scrollResume);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="hero-ascii-canvas" aria-hidden="true" />;
}
