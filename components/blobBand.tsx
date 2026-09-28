'use client';

import { useEffect, useRef } from 'react';

// Animated band of drifting, merging blobs with a wavy edge (WebGL metaballs),
// rendered as chunky dithered pixels for a retro-game look.
// `edge` is the side the wavy edge faces: "bottom" for a header, "top" for a
// footer, "right" for a sidebar.

const FRAME_INTERVAL = 83; // ~12fps, for a choppy retro-game feel

const vsSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const MAX_PATCHES = 8;

const fsSource = `
  // Full precision where available: many phone GPUs implement mediump as
  // 16-bit floats, which breaks the hash functions and turns the blobs into a
  // repeating grid. Desktop GPUs use full precision either way.
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif
  #define MAX_PATCHES ${MAX_PATCHES}
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_edge; // 0 = bottom, 1 = top, 2 = right
  uniform float u_dpr;
  uniform float u_intensity; // overall opacity of the blobs
  // Solid patches behind highlighted elements: (centre.xy, halfSize.xy) in
  // canvas pixels, GL orientation (y up).
  uniform vec4 u_patches[MAX_PATCHES];
  uniform int u_patchCount;

  const float PIXEL = 5.0; // size of one chunky pixel, in CSS px
  const float SCALE = 0.0133; // blob grid cells per canvas pixel
  const float PATCH_PAD = 6.0; // solid margin around highlighted elements, in CSS px

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    ) * 2.0 - 1.0;
  }

  // Sum of soft falloffs from a jittered grid of moving blob centres.
  // Returns (field, id of the nearest blob), so each blob can have its own colour.
  vec3 field(vec2 p, float time) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float sum = 0.0;
    float nearest = 1e4;
    vec2 id = vec2(0.0);
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 n = vec2(float(x), float(y));
        vec2 c = 0.5 + 0.4 * sin(time * 0.3 + 6.2831 * hash2(i + n));
        vec2 d = n + c - f;
        float r2 = dot(d, d);
        float k = max(0.0, 1.0 - r2);
        sum += k * k * k;
        if (r2 < nearest) {
          nearest = r2;
          id = i + n;
        }
      }
    }
    return vec3(sum, id);
  }

  vec2 warp(vec2 p, float time) {
    return p + vec2(
      vnoise(p * 0.5 + time * 0.05),
      vnoise(p * 0.3 - time * 0.03 + 100.0)
    ) * 0.4;
  }

  // Front-layer field coordinates for a point (p = pixel position * SCALE).
  vec2 frontCoords(vec2 p, float time) {
    return warp(p + vec2(time * 0.06, -time * 0.02) + 100.0, time);
  }

  // Id of the front blob at a spot given as fractions of the band: along its
  // length and across its thickness.
  vec2 anchorBlob(float along, float across, bool vertical, float time) {
    vec2 spot = vertical ? vec2(across, along) : vec2(along, across);
    return field(frontCoords(spot * u_resolution * SCALE, time), time).yz;
  }

  // Signed distance to a rounded box (negative inside).
  float sdRoundBox(vec2 p, vec2 halfSize, float r) {
    vec2 q = abs(p) - halfSize + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  // 4x4 ordered (Bayer) dither threshold in [0, 1) for an integer cell.
  float bayer2(vec2 a) {
    a = floor(a);
    return fract(dot(a, vec2(0.5, a.y * 0.75)));
  }
  float bayer4(vec2 a) {
    return bayer2(0.5 * a) * 0.25 + bayer2(a);
  }

  void main() {
    // Snap every pixel to a coarse grid so the band renders as chunky pixels.
    float cellSize = PIXEL * u_dpr;
    vec2 cell = floor(gl_FragCoord.xy / cellSize);
    vec2 frag = (cell + 0.5) * cellSize;
    vec2 p = frag * SCALE;
    float t = u_time;
    float dither = bayer4(cell);

    // PICO-8 palette: red underneath, pink/orange on top.
    vec3 red = vec3(1.0, 0.0, 0.302);      // #ff004d
    vec3 pink = vec3(1.0, 0.467, 0.659);   // #ff77a8
    vec3 orange = vec3(1.0, 0.639, 0.0);   // #ffa300
    vec3 blue = vec3(0.161, 0.678, 1.0);   // #29adff
    vec3 green = vec3(0.0, 0.894, 0.212);  // #00e436

    // Wavy boundary, measured from the open (wavy) side of the band.
    // Horizontal bands wave along x; the vertical (sidebar) band waves along y.
    bool vertical = u_edge > 1.5;
    float xc = (vertical ? frag.y : frag.x) / u_dpr;

    // Everything scales with the band's thickness, so thin borders work too.
    float thickness = vertical ? u_resolution.x : u_resolution.y;
    float boundary = thickness * 0.4;
    boundary += vnoise(vec2(xc * 0.008, t * 0.08)) * thickness * 0.2;
    boundary += vnoise(vec2(xc * 0.02, t * 0.04 + 50.0)) * thickness * 0.08;

    float fromOpen = vertical
      ? u_resolution.x - frag.x
      : mix(frag.y, u_resolution.y - frag.y, u_edge);
    float dist = fromOpen - boundary;

    // Blobs pool against the wavy edge, and fade out past it.
    float wall = smoothstep(thickness * 0.35, 0.0, dist) * 0.15;
    float taper = smoothstep(-thickness * 0.27, 0.0, dist);

    // The outer (solid) edge is always filled, so the band reads as a
    // continuous border with blobs bulging off it.
    float base1 = smoothstep(thickness * 0.5, thickness * 0.8, fromOpen) * 1.2;
    float base2 = smoothstep(thickness * 0.7, thickness * 0.95, fromOpen) * 1.2;

    vec2 p1 = p * 0.7 + vec2(t * 0.02, t * 0.015);
    float f1 = (field(warp(p1, t * 0.6), t * 0.6).x + wall) * taper + base1;

    vec3 front = field(frontCoords(p, t), t);
    float f2 = (front.x + wall) * taper + base2;

    // Highlighted elements sit on a solid patch. The patch boosts the blob
    // fields around it, so its edge wobbles and blobs merge in and out of it.
    float inPatch = 0.0;
    for (int i = 0; i < MAX_PATCHES; i++) {
      if (i >= u_patchCount) break;
      vec4 r = u_patches[i];
      float d = sdRoundBox(frag - r.xy, r.zw + PATCH_PAD * u_dpr, 8.0 * u_dpr);
      inPatch = max(inPatch, step(d, 0.0));
      f2 += smoothstep(14.0 * u_dpr, -4.0 * u_dpr, d) * 0.9;
      f1 += smoothstep(26.0 * u_dpr, 0.0, d) * 0.9;
    }

    // Hard pixel edges; the back layer is a 50% dither pattern.
    float b1 = step(1.02, f1) * step(dither, 0.5);
    float b2 = step(1.06, f2);

    // Top layer drifts between pink and orange, blended by dithering.
    // Each front blob takes one colour: pink, orange and red in equal parts...
    vec2 id = front.yz;
    float pick = hash(id + 0.5);
    vec3 top = pick < 1.0 / 3.0 ? pink : pick < 2.0 / 3.0 ? orange : red;

    // ...except exactly one green and two blue blobs: the ones sitting at fixed
    // spots along the band's solid edge, which is always filled.
    float solidSide = vertical ? 0.1 : mix(0.9, 0.1, u_edge);
    if (id == anchorBlob(0.45, solidSide, vertical, t)) top = green;
    if (id == anchorBlob(0.18, solidSide, vertical, t)) top = blue;
    if (id == anchorBlob(0.72, solidSide, vertical, t)) top = blue;
    top = mix(top, orange, inPatch);
    b2 = max(b2, inPatch);

    // Transparent outside the blobs so the page background shows through.
    // Output is premultiplied alpha (the WebGL default).
    vec3 color = mix(red * b1, top, b2);
    float alpha = max(b1, b2);
    // Keep the band in the background: blobs are only partly opaque.
    gl_FragColor = vec4(color, alpha) * u_intensity;
  }
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

export default function BlobBand({
  edge,
  className,
  intensity = 0.55,
  patchSelector,
  animate = false,
}: {
  edge: 'top' | 'bottom' | 'right';
  className?: string;
  intensity?: number;
  // Elements matching this selector get a solid patch behind them.
  patchSelector?: string;
  // Off by default: draw one still frame. Reduced-motion users always get that.
  animate?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: true });
    if (!gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uDpr = gl.getUniformLocation(program, 'u_dpr');
    gl.uniform1f(
      gl.getUniformLocation(program, 'u_edge'),
      { bottom: 0, top: 1, right: 2 }[edge]
    );
    gl.uniform1f(gl.getUniformLocation(program, 'u_intensity'), intensity);
    const uPatches = gl.getUniformLocation(program, 'u_patches');
    const uPatchCount = gl.getUniformLocation(program, 'u_patchCount');
    const patches = new Float32Array(MAX_PATCHES * 4);

    // Measure highlighted elements relative to the canvas, in GL pixels.
    const updatePatches = (dpr: number) => {
      let count = 0;
      if (patchSelector) {
        const c = canvas.getBoundingClientRect();
        for (const el of Array.from(document.querySelectorAll(patchSelector))) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0 || count >= MAX_PATCHES) continue;
          patches.set(
            [
              (r.left + r.width / 2 - c.left) * dpr,
              (c.bottom - (r.top + r.height / 2)) * dpr,
              (r.width / 2) * dpr,
              (r.height / 2) * dpr,
            ],
            count * 4
          );
          count++;
        }
      }
      gl.uniform4fv(uPatches, patches);
      gl.uniform1i(uPatchCount, count);
    };

    const still =
      !animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let needsResize = true;
    let visible = true;
    let lastFrame = 0;
    let raf = 0;
    let disposed = false;
    const start = performance.now();

    const draw = () => {
      // Render at the real pixel ratio so the chunky pixels stay crisp.
      const dpr = window.devicePixelRatio || 1;
      if (needsResize) {
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        needsResize = false;
      }
      // Still frames use a fixed time so the shape is stable between redraws.
      const t = still ? 20 : (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform1f(uDpr, dpr);
      updatePatches(dpr);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (ts: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || ts - lastFrame < FRAME_INTERVAL) {
        return;
      }
      lastFrame = ts;
      draw();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const onResize = () => {
      needsResize = true;
      if (still) draw();
    };
    window.addEventListener('resize', onResize);

    if (still) {
      draw();
      // Web fonts shift the highlighted elements once they load.
      document.fonts?.ready.then(() => !disposed && onResize());
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [edge, intensity, patchSelector, animate]);

  return (
    <div aria-hidden='true' className={className}>
      <canvas ref={canvasRef} className='block w-full h-full' />
    </div>
  );
}
