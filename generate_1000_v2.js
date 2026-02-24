const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = "1000fragments-gemini";
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const header = `uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

#define PI 3.14159265359
#define TAU 6.28318530718

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash12(vec2 p) {
    vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float res = mix(
        mix(hash12(i + vec2(0,0)), hash12(i + vec2(1,0)), f.x),
        mix(hash12(i + vec2(0,1)), hash12(i + vec2(1,1)), f.x), f.y);
    return res;
}

float fbm(vec2 p) {
    float f = 0.0;
    float amp = 0.5;
    for(int i = 0; i < 4; i++) {
        f += amp * noise(p);
        p = rot(1.1) * p * 2.0;
        amp *= 0.5;
    }
    return f;
}

float cellular(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float md = 8.0;
    for(int y=-1; y<=1; y++)
    for(int x=-1; x<=1; x++) {
        vec2 g = vec2(float(x), float(y));
        vec2 o = hash22(i + g);
        o = 0.5 + 0.5 * sin(time + TAU * o);
        float d = length(g - f + o);
        if(d < md) md = d;
    }
    return md;
}

// SDFs
float sdBox(vec2 p, vec2 b) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
float sdHex(vec2 p, float r) {
    const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
    p = abs(p);
    p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
    p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
    return length(p) * sign(p.y);
}

// Color palettes (Inigo Quilez)
vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
    return a + b*cos( TAU*(c*t+d) );
}
`;

function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Passed v (variable name) and id (unique scope ID for warps)
const coordWarpers = [
    (v, id) => `${v} = fract(${v} * ${rand(2, 10).toFixed(1)}) - 0.5;`,
    (v, id) => `${v} *= rot(time * ${rand(-2, 2).toFixed(2)});`,
    (v, id) => `{ float r_${id} = length(${v}); float a_${id} = atan(${v}.y, ${v}.x); ${v} = vec2(log(r_${id}) - time * ${rand(0.2, 1.5).toFixed(2)}, a_${id} * ${randInt(1, 5)}.0 / PI); }`,
    (v, id) => `${v} = abs(${v}) - ${rand(0.1, 0.5).toFixed(2)};`,
    (v, id) => `${v}.x += sin(${v}.y * ${rand(2, 15).toFixed(1)} + time * ${rand(1, 5).toFixed(1)}) * ${rand(0.05, 0.3).toFixed(2)};`,
    (v, id) => `${v}.y += cos(${v}.x * ${rand(2, 15).toFixed(1)} - time * ${rand(1, 5).toFixed(1)}) * ${rand(0.05, 0.3).toFixed(2)};`,
    (v, id) => `${v} *= 1.0 + ${rand(0.2, 1.0).toFixed(2)} * sin(length(${v}) * ${rand(5, 20).toFixed(1)} - time * ${rand(2, 8).toFixed(1)});`,
    (v, id) => `{ float fov_${id} = 0.5; vec3 p3_${id} = vec3(${v}.x, fov_${id}, ${v}.y - ${rand(-0.5, 0.5).toFixed(2)}); ${v} = vec2(p3_${id}.x/p3_${id}.z, p3_${id}.y/p3_${id}.z); ${v}.y += time * ${rand(0.5, 3.0).toFixed(1)}; }`,
    (v, id) => `${v} = mod(${v} * ${rand(2, 8).toFixed(1)} + vec2(time * ${rand(-2, 2).toFixed(2)}), 1.0) - 0.5;`,
    (v, id) => `{ float a_${id} = atan(${v}.y, ${v}.x); float r_${id} = length(${v}); a_${id} = mod(a_${id}, TAU / ${rand(3, 8).toFixed(1)}) - PI / ${rand(3, 8).toFixed(1)}; ${v} = vec2(cos(a_${id}), sin(a_${id})) * r_${id}; }`
];

const patterns = [
    (v) => `length(${v}) - ${rand(0.1, 0.8).toFixed(2)}`,
    (v) => `sdBox(${v}, vec2(${rand(0.1, 0.6).toFixed(2)}, ${rand(0.1, 0.6).toFixed(2)}))`,
    (v) => `sdHex(${v}, ${rand(0.2, 0.7).toFixed(2)})`,
    (v) => `sin(${v}.x * ${rand(5, 30).toFixed(1)} + time * ${rand(1, 5).toFixed(1)}) * cos(${v}.y * ${rand(5, 30).toFixed(1)} + time * ${rand(1, 5).toFixed(1)})`,
    (v) => `fbm(${v} * ${rand(2, 10).toFixed(1)} + time * ${rand(0.5, 2.0).toFixed(2)})`,
    (v) => `cellular(${v} * ${rand(2, 10).toFixed(1)})`,
    (v) => `fract(length(${v}) * ${rand(5, 20).toFixed(1)} - time * ${rand(1, 5).toFixed(1)})`,
    (v) => `abs(sin(atan(${v}.y, ${v}.x) * ${randInt(2, 12)}.0 + time * ${rand(1, 5).toFixed(1)})) * length(${v})`,
    (v) => {
        let n = randInt(2, 7);
        return `(
            ${Array.from({length: n}).map((_, i) => `sin(length(${v} - vec2(${rand(-0.8, 0.8).toFixed(2)}, ${rand(-0.8, 0.8).toFixed(2)})) * ${rand(10, 40).toFixed(1)} - time * ${rand(2, 10).toFixed(1)})`).join(" + ")}
        ) / ${n}.0`;
    }
];

const ops = [
    (a, b) => `min(${a}, ${b})`,
    (a, b) => `max(${a}, ${b})`,
    (a, b) => `abs(${a} - ${b})`,
    (a, b) => `mod(${a}, ${b} + 0.001)`,
    (a, b) => `(${a} * ${b})`,
    (a, b) => `mix(${a}, ${b}, 0.5 + 0.5 * sin(time))`
];

const postProcessors = [
    (val) => `smoothstep(${rand(0.0, 0.4).toFixed(2)}, ${rand(0.4, 0.8).toFixed(2)}, ${val})`,
    (val) => `abs(${rand(0.01, 0.1).toFixed(3)} / (${val} + 0.001))`,
    (val) => `step(${rand(0.1, 0.9).toFixed(2)}, ${val})`,
    (val) => `fract(${val} * ${rand(2, 10).toFixed(1)})`,
    (val) => `sin(${val} * ${rand(10, 50).toFixed(1)} + time * ${rand(2, 10).toFixed(1)}) * 0.5 + 0.5`,
    (val) => `pow(abs(${val}), ${rand(0.2, 5.0).toFixed(2)})`
];

const colorPalettes = [
    "vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.33, 0.67)",
    "vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.10, 0.20)",
    "vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.10, 0.20)",
    "vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 0.5), vec3(0.8, 0.90, 0.30)",
    "vec3(0.5), vec3(0.5), vec3(1.0, 0.7, 0.4), vec3(0.0, 0.15, 0.20)",
    "vec3(0.8, 0.5, 0.4), vec3(0.2, 0.4, 0.2), vec3(2.0, 1.0, 1.0), vec3(0.0, 0.25, 0.25)",
    "vec3(0.2, 0.1, 0.4), vec3(0.8, 0.9, 0.6), vec3(1.0, 1.0, 1.0), vec3(0.5, 0.5, 0.5)"
];

function generate_shader() {
    let lines = [];
    lines.push('vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);');
    
    let numVars = randInt(1, 3);
    for(let i=0; i<numVars; i++) {
        lines.push('vec2 p' + i + ' = uv;');
        let numWarps = randInt(1, 4);
        for(let w=0; w<numWarps; w++) {
            lines.push(pick(coordWarpers)('p' + i, i + '_' + w));
        }
    }
    
    let valExprs = [];
    for(let i=0; i<numVars; i++) {
        valExprs.push(pick(patterns)('p' + i));
    }
    
    let finalVal = valExprs[0];
    for(let i=1; i<valExprs.length; i++) {
        finalVal = pick(ops)(finalVal, valExprs[i]);
    }
    
    lines.push('float v = ' + finalVal + ';');
    
    let numPosts = randInt(1, 3);
    for(let p=0; p<numPosts; p++) {
        lines.push('v = ' + pick(postProcessors)('v') + ';');
    }

    let palette = pick(colorPalettes);
    lines.push('vec3 col = pal(v + time * ' + rand(0.1, 1.0).toFixed(2) + ', ' + palette + ');');
    
    if(Math.random() < 0.3) {
        lines.push('col.r = fract(col.r + sin(uv.y * 50.0 + time) * 0.1);');
        lines.push('col.g = fract(col.g + cos(uv.x * 40.0 + time) * 0.1);');
    }
    
    if(Math.random() < 0.2) {
        lines.push('col *= 1.0 - smoothstep(0.5, 1.5, length((gl_FragCoord.xy / resolution.xy) - 0.5) * 2.0);');
    }

    lines.push('fragColor = TDOutputSwizzle(vec4(col, 1.0));');

    let main_body = ["void main() {", ...lines.map(l => "    " + l), "}", ""].join("\n");
    return header + main_body;
}

for (let i = 0; i < 1000; i++) {
    let shader_code = generate_shader();
    let filename = path.join(OUTPUT_DIR, String(i).padStart(4, '0') + ".frag");
    fs.writeFileSync(filename, shader_code);
}

console.log("Generated 1000 diverse compositional shaders (Syntax fixed) in " + OUTPUT_DIR);
