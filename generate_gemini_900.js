const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = "1000fragments-gemini";
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

vec2 hash( vec2 p ) {
	p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float cellular(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float F1 = 8.0;
    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i),float(j));
            vec2 o = hash( n + g );
            o = 0.5 + 0.5*sin( time + 6.2831*o );
            float d = length(g - f + o);
            if(d<F1) {
                F1 = d;
            }
        }
    }
    return F1;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot2 = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
        v += a * noise(x);
        x = rot2 * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}
`;

const color_palettes = [
    "vec3 col = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));",
    "vec3 col = mix(vec3(0.1, 0.5, 0.8), vec3(0.9, 0.2, 0.3), d);",
    "vec3 col = vec3(fract(d * 10.0 - time), fract(d * 5.0 + time), fract(d * 2.0));",
    "vec3 col = vec3(step(0.5, fract(d * 20.0)));",
    "vec3 col = vec3(sin(d*10.0+time)*0.5+0.5, sin(d*12.0-time)*0.5+0.5, sin(d*8.0+time*0.5)*0.5+0.5);",
    "vec3 col = mix(vec3(1.0, 0.8, 0.2), vec3(0.2, 0.1, 0.6), clamp(d, 0.0, 1.0));",
    "vec3 col = mix(vec3(0.0), vec3(1.0), smoothstep(0.0, 0.05, abs(d) - 0.02));",
    "vec3 col = 0.5 + 0.5 * cos(time*2.0 + d * 10.0 + vec3(0, 1.5, 3.0));",
    "vec3 col = vec3(smoothstep(0.3, 0.7, fract(d * 5.0 - time)), smoothstep(0.2, 0.8, fract(d * 5.0 - time + 0.2)), smoothstep(0.1, 0.9, fract(d * 5.0 - time + 0.4)));",
    "vec3 col = mix(vec3(0.9, 0.4, 0.1), vec3(0.1, 0.7, 0.8), d);"
];

const patterns = [
    // 0: Basic distance field
    "float d = length(uv); d = sin(d * {freq} - time * {speed}) * 0.5 + 0.5;",
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
    // 9: Cellular / Voronoi
    "float d = cellular(uv * {scale});",
    // 10: FBM
    "float d = fbm(uv * {scale} + time * {speed});",
    // 11: Cross
    "float d = min(abs(uv.x), abs(uv.y)); d = smoothstep(0.0, 0.05, d - {thresh});",
    // 12: Star
    "float a = atan(uv.y, uv.x); float r = {size} + {thresh} * sin(a * {freq} + time); float d = length(uv) - r; d = smoothstep(0.0, 0.02, d);",
    // 13: Spiral
    "float d = length(uv); float a = atan(uv.y, uv.x); float spiral = fract(d * {scale} + a * {freq} / 6.28 - time * {speed}); d = step(0.5, spiral);",
    // 14: Concentric squares
    "float d = max(abs(uv.x), abs(uv.y)); d = fract(d * {scale} - time * {speed}); d = smoothstep(0.4, 0.6, d);",
    // 15: Polka dots
    "vec2 i = floor(uv * {scale}); vec2 f = fract(uv * {scale}) - 0.5; float d = length(f); d = smoothstep({size}, {size} + 0.05, d);"
];

const transforms = [
    "",
    "uv *= rot(time * 0.5);",
    "uv *= rot(length(uv) + time);",
    "uv.x += sin(uv.y * 10.0 + time) * 0.1;",
    "uv = abs(uv);",
    "uv = abs(uv) - 0.5;",
    "uv = fract(uv * 2.0) - 0.5;",
    "uv.y += sin(uv.x * 5.0 + time) * 0.2;",
    "uv *= rot(time * 0.2); uv = abs(uv) - 0.3; uv *= rot(-time * 0.5);",
    "uv = sign(uv) * (abs(uv) - 0.2);"
];

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generate_shader(idx) {
    let patternTemplate = patterns[Math.floor(Math.random() * patterns.length)];
    let pattern = patternTemplate
        .replace(/{speed}/g, rand(0.5, 5.0).toFixed(2))
        .replace(/{scale}/g, rand(2.0, 20.0).toFixed(2))
        .replace(/{thresh}/g, rand(0.01, 0.5).toFixed(2))
        .replace(/{size}/g, rand(0.1, 0.8).toFixed(2))
        .replace(/{freq}/g, randInt(3, 15).toFixed(2));
    
    let transform = transforms[Math.floor(Math.random() * transforms.length)];
    let color = color_palettes[Math.floor(Math.random() * color_palettes.length)];
    
    let pre_transform = "";
    if (Math.random() < 0.3) {
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

for (let i = 100; i < 1000; i++) {
    let shader_code = generate_shader(i);
    let filename = path.join(OUTPUT_DIR, String(i).padStart(4, '0') + ".frag");
    fs.writeFileSync(filename, shader_code);
}

console.log("Generated 900 shaders in " + OUTPUT_DIR);
