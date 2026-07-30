// =====================================================================
//  fractalShader.frag
//
//  TouchDesigner GLSL TOP — composites up to THREE shader inputs into a
//  single self-similar (fractal) tiling.  Designed for GLSL TOPs each
//  running a different 1000fragments_fin/NNNN.frag.  The input count comes
//  from TD_NUM_2D_INPUTS, so one or two connected inputs also work; three
//  is the hard ceiling of the GLSL TOP itself.
//
//  ---------------------------------------------------------------
//  NETWORK SETUP
//  ---------------------------------------------------------------
//    glsl_fractal (GLSL TOP)
//      input 0 <- glsl_a   (a random 1000fragments_fin shader)
//      input 1 <- glsl_b   (another one)
//      input 2 <- glsl_c   (another one)
//
//    Common page   : Inputs = 3
//    Vectors page  : time        float   -> absTime.seconds (or a Speed CHOP)
//                    resolution  vec2    -> optional; if left out the size
//                                           of input 0 is used instead
//
//    Set the source TOPs to Filter = "Mipmap Linear" on their
//    Common page.  The deep levels of the fractal minify heavily and this
//    shader picks the matching mip level analytically, so without mipmaps
//    those levels alias into noise.
//
//  ---------------------------------------------------------------
//  CONTROLS
//  ---------------------------------------------------------------
//    Everything runs off built-in defaults.  To drive it from the network,
//    add the five vec4 uniforms below on the Vectors page and set
//    uCustom = 1.
//
//    uMode    x  mode      0 glitch (default) / 1 kaleido
//             y  modeMix   0..1 crossfade into the other mode
//             z  blend     0 average / 1 screen / 2 max / 3 over-by-luma
//                          (kaleido only)
//             w  levels    1..8 recursion depth
//    uShape   x  ratio     scale step between levels        (1.2 .. 3.0)
//             y  twist     spiral / rotation per level      (-2 .. 2)
//             z  tile      tile density                     (1 .. 6)
//             w  fold      kaleido fold offset              (0.1 .. 0.9)
//    uLook    x  falloff   weight decay per level           (0.3 .. 0.95)
//             y  chroma    per-cell tint strength           (0 .. 1)
//             z  grout     tile border darkening            (0 .. 1)
//             w  vignette  corner falloff                   (0 .. 1)
//    uMotion  x  speed     master tempo: glitch cell contents, kaleido
//                          rotation                         (0 .. 3)
//             y  layout    multiplier on the glitch subdivision clock
//                          alone; 1 = as before, 0 freezes the layout
//             z  wobble    domain wobble (kaleido)          (0 .. 1)
//             w  seed      reshuffles which input goes where
//
//  MODES
//    0  glitch    (startup default)  kaleido's recursion cut with a binary
//                 guillotine instead of a fold: off-centre splits give every
//                 cell its own aspect ratio, and a per-cell repeat count
//                 makes the tiling density jump from coarse blocks to fine
//                 moire.
//    1  kaleido   abs-fold IFS; the inputs accumulate across scales
//
//  Mode 0 reads several controls differently, since it has no fold or
//  accumulation of its own:
//                uShape.y twist   sideways slab displacement
//                uShape.z tile    ceiling on the per-cell repeat count
//                uShape.w fold    how far cuts may stray from centre, i.e.
//                                 how extreme the aspect ratios get
//                uShape.x ratio   bias of the repeat count toward coarse
//                uLook.x  falloff how often a cell keeps subdividing
//                uLook.y  chroma  channel separation + per-cell tint
//                uMotion.x speed  re-roll rate of the cell contents
//                uMotion.y layout multiplier on the subdivision re-roll
//
//  Re-roll period is 1 / (speed * 1.5 * layout) seconds for the subdivision
//  and 1 / (speed * 7) for the contents — at the defaults, 11.1 s and 2.4 s.
//  Setting uClock.x / uClock.y from the network overrides the subdivision
//  and cell-contents clocks: each then changes only when its number is
//  bumped, so the intervals can be randomised rather than fixed.
//  uClock.z carries a tiling fineness step + 1 (steps 0..23): 0 is a single
//  full-screen cell, 11 is about 3x finer than the falloff default, and the
//  ramp keeps the same slope on up to 23.
//
//  Both modes pick their mip level analytically from the tile's own scale,
//  so the deep levels stay smooth without relying on screen-space
//  derivatives (which break down at the tile seams).
// =====================================================================

uniform float time;
uniform vec2  resolution;   // optional — falls back to the size of input 0

uniform float uCustom;      // 0 = built-in defaults, 1 = use the vec4s below
uniform vec4  uMode;
uniform vec4  uShape;
uniform vec4  uLook;
uniform vec4  uMotion;
// Optional external clocks / controls for the glitch mode.  x = subdivision
// (layout) generation, y = cell-contents generation, z = tiling fineness as
// step+1 (so 0 still means "nothing is driving me"; steps run 0..11).  When one is non-zero that clock
// advances only when something outside bumps the number, which lets each
// state last a different length of time instead of changing on a fixed
// beat.  A project that never declares uClock gets 0 and keeps the steady
// internal clocks.
uniform vec4  uClock;

out vec4 fragColor;

#define TAU    6.28318530718
// how many source inputs are actually connected -- the input picker works
// off this rather than a hard-coded 3, so the shader adapts to the project
#define NIN    float(TD_NUM_2D_INPUTS)
#define MAXL   8
#define MAXG   28      // the glitch mode needs far deeper recursion than the
                       // fold-based modes; the top fineness steps aim at a
                       // mean depth above 20, so the cap has to clear that

// ---- resolved controls (filled in by setup()) ------------------------
int   mode;
float modeMix;
int   blendMode;
int   levels;
float ratio, twist, tile, fold;
float falloff, chroma, grout, vign;
float speed, layoutRate, wobble, seed;
float layoutGen, contentGen, fineStep;

// Set by main().  gExt is the half-extent of the visible area in p units;
// gAxis is p before the global spin/wobble, because the glitch mode's
// rectangles have to stay aligned to the screen.
vec2 gExt, gAxis;

void setup()
{
    float s = step(0.5, uCustom);
    mode      = int(clamp(mix(0.0,  uMode.x,   s), 0.0, 1.0));
    modeMix   =     clamp(mix(0.0,  uMode.y,   s), 0.0, 1.0);
    blendMode = int(clamp(mix(3.0,  uMode.z,   s), 0.0, 3.0));
    levels    = int(clamp(mix(5.0,  uMode.w,   s), 1.0, float(MAXL)));

    ratio   = clamp(mix(2.00, uShape.x,  s), 1.15, 3.0);
    twist   =       mix(0.35, uShape.y,  s);
    // Floor is 0, not 1: repCeil is 1 + tile*20, so a floor of 1 meant a
    // cell could never show fewer than ~21 repeats.  0 lets the repeats be
    // turned off entirely (repCeil 1 -> exactly one copy per cell).  Values
    // of 1 and above are unaffected, so the other project reads the same.
    tile    = clamp(mix(1.00, uShape.z,  s), 0.0,  6.0);
    fold    = clamp(mix(0.45, uShape.w,  s), 0.05, 0.95);

    falloff = clamp(mix(0.62, uLook.x,   s), 0.10, 0.98);
    chroma  = clamp(mix(0.35, uLook.y,   s), 0.0,  1.0);
    grout   = clamp(mix(0.55, uLook.z,   s), 0.0,  1.0);
    vign    = clamp(mix(0.35, uLook.w,   s), 0.0,  1.0);

    speed   =           mix(0.06, uMotion.x, s);
    // multiplier on the glitch subdivision clock only; 0 freezes the layout
    layoutRate = max(0.0, mix(1.00, uMotion.y, s));
    wobble  = clamp(mix(0.30, uMotion.z, s), 0.0, 1.0);
    seed    =       mix(0.00, uMotion.w, s);
    // not gated by uCustom: these are counters fed from outside, not looks
    layoutGen  = uClock.x;
    contentGen = uClock.y;
    fineStep   = uClock.z;
}

// ---------------------------------------------------------------------
//  helpers
// ---------------------------------------------------------------------
mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }

// Sampler arrays may only be indexed by a constant expression, so the
// inputs are unrolled by hand, each branch compiled only when that input
// exists.  Three is the ceiling: a GLSL TOP in TouchDesigner 2025.33070 has
// exactly three input connectors and they do not grow -- a .toe may record
// more connections but the loader keeps only the first three.
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

// dens = size of one screen pixel measured in uv units.  Turning it into
// a mip level keeps the deep, heavily minified levels smooth.
float lodFor(float dens)
{
    float texel = float(textureSize(sTD2DInputs[0], 0).x);
    return max(0.0, log2(max(dens * texel, 1.0)));
}

// One tile lookup: pick an input from the cell id, sample it, tint it, and
// report how close this pixel is to the tile border.
vec3 tileLook(vec2 cellId, vec2 uv, float dens, float lvl, out float edge)
{
    float h = hash21(cellId + seed * 17.0);

    // quarter-turn per cell — turns a plain grid into a weave
    float turn = floor(hash21(cellId + 4.7) * 4.0);
    vec2 c = rot2(turn * 1.5707963) * (uv - 0.5);
    uv = c + 0.5;

    int idx = int(mod(floor(h * NIN) + lvl, NIN));

    // stay a texel inside the tile so bilinear taps never wrap around
    vec2 suv = clamp(uv, 0.0, 1.0) * 0.996 + 0.002;
    vec3 col = fetch(idx, suv, lodFor(dens));

    col *= 1.0 - chroma
         + chroma * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + h * TAU + lvl * 0.7));

    vec2 d = min(uv, 1.0 - uv);
    edge = smoothstep(0.0, max(0.025, dens * 2.5), min(d.x, d.y));
    return col;
}

vec3 blendOp(vec3 base, vec3 s, float w)
{
    if(blendMode == 0) return base + s * w;                          // average
    if(blendMode == 1) return 1.0 - (1.0 - base) * (1.0 - s * w);    // screen
    if(blendMode == 2) return max(base, s * w);                      // max
    return mix(base, s, clamp(luma(s) * w * 1.6, 0.0, 1.0));         // over-by-luma
}

// ---------------------------------------------------------------------
//  MODE 1 — kaleido: abs-fold IFS accumulated across scales
// ---------------------------------------------------------------------
vec3 modeKaleido(vec2 p, float pxP)
{
    float step_ = 1.0 + 0.35 * (ratio - 1.0);   // per-level growth

    vec3  col  = vec3(0.0);
    float wsum = 0.0;
    float w    = 1.0;
    vec2  q    = p;
    float sc   = 1.0;

    for(int i = 0; i < MAXL; i++){
        if(i >= levels) break;
        float fi = float(i);

        q  = abs(q) - fold;
        // 2.5 keeps this identical to the old dedicated spin control, whose
        // default was 0.15 against speed's 0.06
        q  = rot2(twist + time * speed * 2.5 * (0.25 + 0.15 * fi)) * q;
        q *= step_;
        sc *= step_;

        vec2 g = q * tile;
        float edge;
        vec3 c = tileLook(floor(g), fract(g), pxP * sc * tile, fi, edge);
        c *= mix(1.0, edge, grout);

        col   = blendOp(col, c, w);
        wsum += w;
        w    *= falloff;
    }
    if(blendMode == 0) col /= max(wsum, 1e-4);
    return col;
}

// ---------------------------------------------------------------------
//  MODE 0 — glitch: irregular rectangular subdivision
//
//  Kaleido folds space into tiles that are all the same shape.  This takes
//  the same idea of recursion but cuts with a binary guillotine instead:
//  every step picks an axis and an OFF-CENTRE split, so cells drift far
//  from square and each one ends up with its own aspect ratio.  A per-cell
//  repeat count then decides how many times the input is tiled inside that
//  cell, which is what makes neighbouring patches jump between coarse
//  blocks and fine moire.
//
//  Two clocks drive it: the subdivision re-rolls slowly, the cell contents
//  re-roll several times faster, so the layout holds still long enough to
//  read while the fill keeps stuttering.
// ---------------------------------------------------------------------
vec3 modeGlitch(float pxP)
{
    vec2 p = gAxis;                       // never rotated — stays axis-aligned
    // Two clocks: the subdivision holds still long enough to read while the
    // cell contents keep stuttering.  `layoutRate` scales the first one
    // alone, so the ratio between them is adjustable, not fixed.
    // ('layout' itself is a reserved GLSL keyword.)
    // Subdivision generation.  Driven from outside when uClock.x is set, so
    // the layout can hold for a randomly chosen span each time; otherwise it
    // advances on the steady internal clock.
    float sSlow = (layoutGen > 0.5 ? layoutGen
                                   : floor(time * speed * layoutRate * 1.5))
                  + seed * 13.0;
    float sFast = (contentGen > 0.5 ? contentGen
                                    : floor(time * speed * 7.0))
                  + seed * 29.0;

    vec2 lo = -gExt, hi = gExt;
    float depth = 0.0;
    // Chance a cell keeps subdividing.  This, not the depth cap, is what
    // sets the density: at 0.87 a branch survives ~8 levels on average.
    float split = mix(0.70, 0.98, falloff);
    float pBase   = split;
    float repCeil = 1.0 + tile * 20.0;
    float boost   = 1.0;

    // uClock.z, when driven, replaces that with one of 24 fineness steps.
    // Step 0 leaves the frame as a single cell with no repeats; step 11 sits
    // about 3x finer than the falloff-driven default and step 23 carries the
    // same slope on to roughly 30x the cell count of step 11.  The ramp
    // interpolates the EXPECTED number of splits rather than the probability
    // itself, which otherwise crowds against 1 and makes the low steps
    // indistinguishable from each other.
    float dMin = 0.0;        // splits every cell is guaranteed
    float shiftAmt = 1.0;    // scales the sideways slab displacement
    float gCap = 16.0;       // depth cap while driven; see below
    if(fineStep > 0.5){
        float st = clamp(fineStep - 1.0, 0.0, 23.0);   // the step, 0..23
        // Anchored on step 11, not on the top of the range, so steps 0..11
        // render exactly as they did before the range was extended and a
        // live pattern written against them still means the same thing.
        float f  = st / 11.0;
        // Halving the linear cell size costs exactly two more splits, so the
        // headroom above the falloff default is expressed in split counts.
        float dTop = split / max(1.0 - split, 1e-4) + 3.17;
        // Target mean depth: the old slope, simply carried on past step 11.
        // Step 1 starts at 1.5 rather than sliding up from zero -- below one
        // split the outcome hangs on a couple of fixed hashes and several
        // early steps came out identical.
        float D = (st < 0.5) ? 0.0 : 1.5 + (st - 1.0) * (dTop - 1.5) / 10.0;
        // Most of the depth is guaranteed and the remainder left to chance,
        // so the ramp is monotonic while the cells still vary in size.
        dMin = floor(D * 0.7);
        float rest = max(D - dMin, 0.0);
        pBase = rest / (1.0 + rest);    // mean depth then works out to D
        repCeil  = (1.0 + tile * 20.0) * 3.0 * f;
        boost    = 0.0;                 // dMin already sets the floor
        // beyond step 11 a bigger shift only wraps the tile further, so cap
        shiftAmt = min(f, 1.0);
        // The cap has to rise with the target depth or the top steps get
        // truncated before they reach the density they ask for.  It stays at
        // 16 through step 11 so those steps keep clipping their deep tail
        // exactly where they used to, and only the new steps recurse further.
        gCap = 16.0 + max(st - 11.0, 0.0);
    }
    int gLevels = (fineStep > 0.5) ? int(min(gCap, float(MAXG)))
                                   : min(levels + 8, MAXG);

    for(int i = 0; i < MAXG; i++){
        if(i >= gLevels) break;
        vec2 cid = lo * 7.31 + hi * 3.17;
        vec2 sz = hi - lo;
        // Big cells almost always keep splitting, so the frame never ends up
        // with a huge flat slab.  Unlike an aspect-driven bias this can't run
        // away: splitting shrinks the cell, which relieves the pressure.
        float rel = max(sz.x / gExt.x, sz.y / gExt.y) * 0.5;
        float pSplit = mix(pBase, 0.995, smoothstep(0.18, 0.75, rel) * boost);
        // below dMin the cell splits no matter what the hash says
        if(float(i) >= dMin && hash21(cid + sSlow) > pSplit) break;
        float ha = hash21(cid + 1.7 + sSlow);
        float hb = hash21(cid + 9.3 + sSlow);
        // The axis is an unbiased coin flip on purpose.  Biasing it toward
        // the short axis compounds over the recursion — wide cells get cut
        // wider still — and the whole frame degenerates into strips.  The
        // aspect spread comes from the off-centre cut alone.
        float cut = clamp(0.5 + (hb - 0.5) * fold * 1.9, 0.06, 0.94);
        if(ha < 0.5){
            float m = lo.x + sz.x * cut;
            if(p.x < m) hi.x = m; else lo.x = m;
        } else {
            float m = lo.y + sz.y * cut;
            if(p.y < m) hi.y = m; else lo.y = m;
        }
        depth += 1.0;
    }

    vec2 sz  = max(hi - lo, vec2(1e-4));
    vec2 cid = lo * 7.31 + hi * 3.17;
    vec2 cuv = (p - lo) / sz;

    // per-cell fineness, independent per axis.  The exponent biases most
    // cells coarse so the fine moire patches stay a minority.
    float repMax = repCeil;
    vec2 rep = floor(1.0 + pow(vec2(hash21(cid + 3.1 + sFast),
                                    hash21(cid + 6.9 + sFast)),
                               vec2(max(ratio, 0.5))) * repMax);
    vec2 tuv = fract(cuv * rep);

    // datamosh slab shift on some cells
    float h3 = hash21(cid + 12.7 + sFast);
    float h4 = hash21(cid + 21.3 + sFast);
    tuv.x = fract(tuv.x + step(0.55, h3) * (h4 - 0.5) * twist * 2.0 * shiftAmt);

    float dens = max(rep.x / sz.x, rep.y / sz.y) * pxP;
    float lod  = lodFor(dens);
    int   idx  = int(mod(floor(hash21(cid + 30.1 + sFast) * NIN) + depth, NIN));

    vec2 suv = clamp(tuv, 0.0, 1.0) * 0.996 + 0.002;
    vec3 col = fetch(idx, suv, lod);

    // channel separation on a minority of cells
    if(hash21(cid + 44.9 + sFast) > 1.0 - chroma * 0.5){
        float o = (h4 - 0.5) * 0.06 + 0.01;
        col.r = fetch(idx, clamp(suv + vec2(o, 0.0), 0.002, 0.998), lod).r;
        col.b = fetch(idx, clamp(suv - vec2(o, 0.0), 0.002, 0.998), lod).b;
    }

    // occasional inverted and hard-clipped cells
    col = mix(col, 1.0 - col, step(0.94, hash21(cid + 57.3 + sFast)));
    col = mix(col, step(vec3(0.5), col),
              step(0.90, hash21(cid + 63.7 + sFast)) * 0.7);

    col *= 1.0 - chroma * 0.5
         + chroma * 0.5 * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188)
                                           + hash21(cid + 71.1) * TAU));

    // ~1.5px border, measured in pixels so it stays even across cell sizes
    vec2 e = min(cuv, 1.0 - cuv) * sz / max(pxP, 1e-6);
    col *= mix(1.0, smoothstep(0.0, 1.6, min(e.x, e.y)), grout);
    return col;
}

// ---------------------------------------------------------------------
vec3 renderMode(int m, vec2 p, float pxP)
{
    if(m == 0) return modeGlitch(pxP);
    return modeKaleido(p, pxP);
}

void main()
{
    setup();

    vec2 res = resolution;
    if(res.x < 1.0) res = vec2(textureSize(sTD2DInputs[0], 0));

    vec2  p   = (gl_FragCoord.xy * 2.0 - res) / min(res.x, res.y);
    float pxP = 2.0 / min(res.x, res.y);      // one pixel, in p units

    // Framing guard for extreme aspect ratios (LED strips, portrait walls):
    // pull the design in so it fills the long axis instead of exposing the
    // empty outskirts.  A no-op at 16:9 and anything squarer.
    float ar = max(res.x, res.y) / min(res.x, res.y);
    float fit = min(1.0, 1.8 / ar);
    p   *= fit;
    pxP *= fit;

    gExt  = res / min(res.x, res.y) * fit;    // visible half-extent, in p units
    gAxis = p;                                // keep an un-rotated copy

    // slow global drift so the composite never sits perfectly still
    p = rot2(time * speed * 0.30) * p;
    p += vec2(sin(time * 0.21), cos(time * 0.17)) * wobble * 0.12;

    vec3 col = renderMode(mode, p, pxP);
    if(modeMix > 0.001){
        vec3 nxt = renderMode(1 - mode, p, pxP);
        col = mix(col, nxt, modeMix);
    }

    // ---- grade (matches the 1000fragments_fin family) ----
    col = clamp(col, 0.0, 1.0);
    col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
    col = mix(vec3(luma(col)), col, 1.12);
    col += 0.008;
    vec2 fq = gl_FragCoord.xy / res - 0.5;
    col *= 1.0 - vign * 1.4 * dot(fq, fq);

    fragColor = TDOutputSwizzle(vec4(clamp(col, 0.0, 1.0), 1.0));
}
