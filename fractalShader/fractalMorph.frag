// =====================================================================
//  fractalMorph.frag
//
//  TouchDesigner GLSL TOP for the second section of fractal_mix_new.toe.
//  The same guillotine subdivision as fractalShader.frag's glitch mode, but
//  the cuts MOVE: every split position drifts on its own slow pair of sines,
//  so the tiles widen, narrow, grow and shrink continuously while the shape
//  of the tree holds still.
//
//  ---------------------------------------------------------------
//  WHY A SEPARATE FILE
//  ---------------------------------------------------------------
//    fractalShader.frag is shared by every fractal_* build, so a change
//    there lands in all of them at once.  This file is read only by
//    fractal_mix_new.toe (morph_file -> morph).
//
//  ---------------------------------------------------------------
//  WHY THE NODE IDS ARE PATH-BASED
//  ---------------------------------------------------------------
//    fractalShader.frag names a cell by its bounds (lo * 7.31 + hi * 3.17)
//    and hashes that for every decision.  The moment a cut moves, every id
//    below it changes and the whole tree re-rolls -- right for hard cuts,
//    fatal for a morph.  Here a node is named by the path that reached it
//    (the seed, then left/right at each level), which does not depend on
//    where the cuts sit, so a node keeps its axis, its split decision and
//    its input however far its cut has drifted.
//
//    The split decision also looks at the node's REST size (the size it
//    would have with every cut at rest) rather than its live size, so big
//    cells still almost always split without the tree popping when a cell
//    breathes across the threshold.
//
//  ---------------------------------------------------------------
//  NETWORK SETUP
//  ---------------------------------------------------------------
//    morph (GLSL TOP)
//      input 0..2 <- lvl_ma / lvl_mb / lvl_mc   (Filter = Mipmap -- the LOD
//                                                is picked analytically)
//    Vectors page:
//      resolution  vec2   output size in pixels
//      uMorph   x  phase     advanced every frame by switcher_m
//                            (Morphspeed), not by an expression, so a speed
//                            change never makes the cuts jump
//               y  amount    0 = cuts sit at rest, 1 = full sweep
//               z  seed      structure id; switcher_m draws a new one each
//                            time the section starts
//               w  spread    how uneven the REST layout is (0 = all halves)
//      uSplit   x  minDepth  splits every branch is guaranteed
//               y  pSplit    chance to keep splitting beyond that
//               z  maxDepth  hard cap on the recursion (1..24)
//               w  repeat    per-cell repeat ceiling, 1 = one copy
//      uLook    x  (unused)  y chroma   z grout   w vignette
// =====================================================================

uniform vec2  resolution;
uniform vec4  uMorph;
uniform vec4  uSplit;
uniform vec4  uLook;

out vec4 fragColor;

#define TAU   6.28318530718
#define NIN   float(TD_NUM_2D_INPUTS)
#define MAXD  24     // at 3328 x 1280 a depth-16 cell averages ~8 x 8 px;
                     // past that most cells are under a few pixels and read
                     // as grout-darkened texture rather than tiles

// ---------------------------------------------------------------------
//  helpers
// ---------------------------------------------------------------------
// Integer hash: the node ids are exact integers, so a float sin-hash would
// lose them once the path grows deep.
uint hashU(uint x)
{
    x ^= x >> 16u;
    x *= 0x7feb352du;
    x ^= x >> 15u;
    x *= 0x846ca68bu;
    x ^= x >> 16u;
    return x;
}

// k picks an independent stream per decision on the same node
float h01(uint n, uint k)
{
    return float(hashU(n ^ (k * 0x9e3779b9u)) >> 8u) * (1.0 / 16777216.0);
}

float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }

// Sampler arrays may only be indexed by a constant expression, so the
// inputs are unrolled by hand, as in fractalShader.frag.
vec3 fetch(int i, vec2 uv, float lod)
{
#if TD_NUM_2D_INPUTS > 1
    if(i == 1) return textureLod(sTD2DInputs[1], uv, lod).rgb;
#endif
#if TD_NUM_2D_INPUTS > 2
    if(i == 2) return textureLod(sTD2DInputs[2], uv, lod).rgb;
#endif
    return textureLod(sTD2DInputs[0], uv, lod).rgb;
}

// dens = uv units per screen pixel
float lodFor(float dens)
{
    float texel = float(textureSize(sTD2DInputs[0], 0).x);
    return max(0.0, log2(max(dens * texel, 1.0)));
}

// Where node n cuts its cell, as a fraction 0..1 of the cell.
//
// The rest offset sets a fixed, per-node unevenness; the two sines move the
// cut around it.  Their rates differ per node and are not in a simple ratio,
// so neighbouring tiles never breathe in step and the motion does not loop
// visibly.  tanh keeps the cut inside the cell smoothly instead of clamping
// it, so a cut slows as it nears an edge rather than stopping dead.
float cutAt(uint n, float phase, float amount, float spread)
{
    float off = (h01(n, 2u) - 0.5) * 2.0 * spread;
    float w1  = mix(0.55, 1.45, h01(n, 3u));
    float w2  = mix(0.30, 0.90, h01(n, 4u));
    float s   = 0.62 * sin(phase * w1 + h01(n, 5u) * TAU)
              + 0.38 * sin(phase * w2 + h01(n, 6u) * TAU);
    return 0.5 + 0.44 * tanh(1.3 * (off + amount * s));
}

// ---------------------------------------------------------------------
void main()
{
    vec2 res = resolution;
    if(res.x < 1.0) res = vec2(textureSize(sTD2DInputs[0], 0));

    float phase   = uMorph.x;
    float amount  = clamp(uMorph.y, 0.0, 1.5);
    float spread  = clamp(uMorph.w, 0.0, 1.0);
    int   dMin    = int(clamp(uSplit.x, 0.0, float(MAXD)));
    float pBase   = clamp(uSplit.y, 0.0, 0.98);
    int   dMax    = int(clamp(uSplit.z, 1.0, float(MAXD)));
    float repCeil = max(uSplit.w, 1.0);
    float chroma  = clamp(uLook.y, 0.0, 1.0);
    float grout   = clamp(uLook.z, 0.0, 1.0);
    float vign    = clamp(uLook.w, 0.0, 1.0);

    // Everything below is in pixels, so the grout is an even width whatever
    // the cell size and the subdivision follows the frame's own aspect.
    vec2 q   = gl_FragCoord.xy;
    vec2 lo  = vec2(0.0), hi  = res;     // live bounds of the current cell
    vec2 rlo = vec2(0.0), rhi = res;     // the same node's bounds at rest

    uint node = hashU(uint(max(uMorph.z, 0.0)) * 0x27d4eb2du + 0x165667b1u);
    float depth = 0.0;

    for(int i = 0; i < MAXD; i++){
        if(i >= dMax) break;
        // Big cells (judged at rest) almost always keep splitting, so the
        // frame never settles into one huge flat slab.
        vec2  rsz = rhi - rlo;
        float rel = max(rsz.x / res.x, rsz.y / res.y);
        float pS  = mix(pBase, 0.97, smoothstep(0.25, 0.70, rel));
        if(i >= dMin && h01(node, 1u) > pS) break;

        // unbiased axis, as in fractalShader.frag: biasing toward the short
        // side compounds down the tree and collapses the frame into strips
        bool  onX = h01(node, 0u) < 0.5;
        float c   = cutAt(node, phase, amount, spread);
        float rc  = cutAt(node, phase, 0.0,    spread);
        uint  branch;
        if(onX){
            float m  = mix(lo.x,  hi.x,  c);
            float rm = mix(rlo.x, rhi.x, rc);
            if(q.x < m){ hi.x = m; rhi.x = rm; branch = 0u; }
            else       { lo.x = m; rlo.x = rm; branch = 1u; }
        } else {
            float m  = mix(lo.y,  hi.y,  c);
            float rm = mix(rlo.y, rhi.y, rc);
            if(q.y < m){ hi.y = m; rhi.y = rm; branch = 0u; }
            else       { lo.y = m; rlo.y = rm; branch = 1u; }
        }
        node   = hashU(node * 2u + branch + 1u);
        depth += 1.0;
    }

    vec2 sz  = max(hi - lo, vec2(1e-3));
    vec2 cuv = (q - lo) / sz;

    // Per-cell repeat count, fixed for the life of the node so a tile's
    // contents stretch with it instead of re-rolling.  Biased coarse.
    vec2 rep = min(vec2(1.0) + floor(pow(vec2(h01(node, 10u), h01(node, 11u)),
                                         vec2(2.0)) * repCeil),
                   vec2(repCeil));
    vec2 tuv = fract(cuv * rep);

    float lod = lodFor(max(rep.x / sz.x, rep.y / sz.y));
    int   idx = int(mod(floor(h01(node, 12u) * NIN) + depth, NIN));
    vec2  suv = clamp(tuv, 0.0, 1.0) * 0.996 + 0.002;
    vec3  col = fetch(idx, suv, lod);

    col *= 1.0 - chroma * 0.5
         + chroma * 0.5 * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188)
                                           + h01(node, 13u) * TAU));

    // ~1.5px border, in pixels so it stays even across cell sizes
    vec2 e = min(cuv, 1.0 - cuv) * sz;
    col *= mix(1.0, smoothstep(0.0, 1.6, min(e.x, e.y)), grout);

    // ---- grade (matches fractalShader.frag) ----
    col = clamp(col, 0.0, 1.0);
    col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
    col = mix(vec3(luma(col)), col, 1.12);
    col += 0.008;
    vec2 fq = gl_FragCoord.xy / res - 0.5;
    col *= 1.0 - vign * 1.4 * dot(fq, fq);

    fragColor = TDOutputSwizzle(vec4(clamp(col, 0.0, 1.0), 1.0));
}
