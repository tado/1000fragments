const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = "100fragments-gemini";
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const header = `uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
`;

const helpers = `
#define PI 3.14159265359

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), f.x),
               mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x), f.y);
}

float sdBox( vec2 p, vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdCircle( vec2 p, float r ) {
    return length(p) - r;
}
`;

const color_palettes = [
    "vec3 col = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));",
    "vec3 col = mix(vec3(0.1, 0.5, 0.8), vec3(0.9, 0.2, 0.3), d);",
    "vec3 col = vec3(fract(d * 10.0 - time), fract(d * 5.0 + time), fract(d * 2.0));",
    "vec3 col = vec3(step(0.5, fract(d * 20.0)));",
    "vec3 col = vec3(sin(d*10.0+time)*0.5+0.5, sin(d*12.0-time)*0.5+0.5, sin(d*8.0+time*0.5)*0.5+0.5);",
    "vec3 col = mix(vec3(1.0, 0.8, 0.2), vec3(0.2, 0.1, 0.6), clamp(d, 0.0, 1.0));",
    "vec3 col = mix(vec3(0.0), vec3(1.0), smoothstep(0.0, 0.05, abs(d) - 0.02));"
];

const patterns = [
    // 0: Basic distance field
    "float d = length(uv); d = sin(d * 20.0 - time * {speed}) * 0.5 + 0.5;",
    // 1: Grid
    "vec2 g = fract(uv * {scale}) - 0.5; float d = length(g); d = step({thresh}, d);",
    // 2: Box distance
    "float d = sdBox(uv * rot(time * {speed}), vec2({size})); d = smoothstep(0.0, 0.05, abs(d) - {thresh});",
    // 3: Angle pattern
    "float a = atan(uv.y, uv.x); float d = sin(a * {freq} + time * {speed}) * 0.5 + 0.5;",
    // 4: Noise displacement
    "uv += noise(uv * {scale} + time * {speed}) * {thresh}; float d = length(uv); d = fract(d * 10.0);",
    // 5: Modulo repeating space
    "vec2 g = mod(uv * {scale}, 1.0) - 0.5; float d = length(g); d = smoothstep({thresh}, {thresh} + 0.02, d);",
    // 6: Wave interference
    "float d = sin(uv.x * {freq} + time) + sin(uv.y * {freq} - time) + sin((uv.x+uv.y) * {freq} + time * {speed}); d = d * 0.33 + 0.5;",
    // 7: Rings
    "float d = abs(length(uv) - {size}); d = 0.02 / max(d, 0.001);",
    // 8: Glitch rects
    "float r = random(floor(uv * {scale} + time * {speed})); float d = step(0.5, r);",
    // 9: Cellular / Voronoi like
    "vec2 i = floor(uv * {scale}); vec2 f = fract(uv * {scale}); float d = 1.0; for(int y=-1; y<=1; y++) for(int x=-1; x<=1; x++) { vec2 neighbor = vec2(float(x), float(y)); vec2 p = neighbor + 0.5 + 0.5*sin(time* {speed} + 6.2831*random(i + neighbor)); d = min(d, length(f - p)); } d = smoothstep(0.1, 0.15, d);"
];

const transforms = [
    "",
    "uv *= rot(time * 0.5);",
    "uv *= rot(length(uv) + time);",
    "uv.x += sin(uv.y * 10.0 + time) * 0.1;",
    "uv = abs(uv);",
    "uv = abs(uv) - 0.5;",
    "uv = fract(uv * 2.0) - 0.5;",
];

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function generate_shader(idx) {
    let patternTemplate = patterns[Math.floor(Math.random() * patterns.length)];
    let pattern = patternTemplate
        .replace(/{speed}/g, rand(0.5, 5.0).toFixed(2))
        .replace(/{scale}/g, rand(2.0, 20.0).toFixed(2))
        .replace(/{thresh}/g, rand(0.01, 0.5).toFixed(2))
        .replace(/{size}/g, rand(0.1, 0.8).toFixed(2))
        .replace(/{freq}/g, rand(2.0, 15.0).toFixed(2));
    
    let transform = transforms[Math.floor(Math.random() * transforms.length)];
    let color = color_palettes[Math.floor(Math.random() * color_palettes.length)];
    
    let pre_transform = "";
    if (Math.random() < 0.2) {
        pre_transform = "uv *= " + rand(0.5, 3.0).toFixed(2) + " + sin(time) * " + rand(0.1, 0.5).toFixed(2) + ";";
    }
    
    let main_body = `void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
    ${pre_transform}
    ${transform}
    
    ${pattern}
    
    ${color}
    
    vec4 finalColor = vec4(col, 1.0);
    fragColor = TDOutputSwizzle(finalColor);
}
`;
    return header + helpers + main_body;
}

for (let i = 0; i < 100; i++) {
    let shader_code = generate_shader(i);
    let filename = path.join(OUTPUT_DIR, String(i).padStart(4, '0') + ".frag");
    fs.writeFileSync(filename, shader_code);
}

console.log("Generated 100 shaders in " + OUTPUT_DIR);
