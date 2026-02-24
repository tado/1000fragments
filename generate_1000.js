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

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot2 = rot(0.5);
    for (int i = 0; i < 5; ++i) {
        v += a * noise(x);
        x = rot2 * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

vec2 hash( vec2 p ) {
	p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float cellular(vec2 p, float speed) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float F1 = 8.0;
    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i),float(j));
            vec2 o = hash( n + g );
            o = 0.5 + 0.5*sin( time * speed + 6.2831*o );
            float d = length(g - f + o);
            if(d<F1) F1 = d;
        }
    }
    return F1;
}

vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
float noise3(vec3 p) {
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);
    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);
    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);
    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));
    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
    return o4.y * d.y + o4.x * (1.0 - d.y);
}

vec3 hsb2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`;

const coordsModifiers = [
    "vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);",
    "vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y); uv *= {scale};",
    "vec2 p_coord = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y); float r_coord = length(p_coord); float a_coord = atan(p_coord.y, p_coord.x); vec2 uv = vec2(r_coord, a_coord);",
    "vec2 p_coord = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y); float fov_coord = 0.5; vec3 p3_coord = vec3(p_coord.x, fov_coord, p_coord.y - 0.2); vec2 uv = vec2(p3_coord.x/p3_coord.z, p3_coord.y/p3_coord.z) * {scale} + time * {speed};",
    "vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y); uv.x += sin(uv.y * {freq} + time * {speed}) * {amp}; uv.y += cos(uv.x * {freq} + time * {speed}) * {amp};",
    "vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y); float a_coord = atan(uv.y, uv.x); float r_coord = length(uv); a_coord = mod(a_coord, PI / {scale}) - PI / ({scale} * 2.0); uv = vec2(cos(a_coord), sin(a_coord)) * r_coord;"
];

const patterns = [
    `float d = 0.0; vec2 p = uv; 
    for(float i=1.0; i<8.0; i++) {
        p.x += {amp} / i * sin(i * {freq} * p.y + time * {speed} + cos((time / (100.0 * i)) * i));
        p.y += {amp} / i * cos(i * {freq} * p.x + time * {speed} + sin((time / (100.0 * i)) * i));
    }
    c = vec3(cos(p.x+p.y+2.0), sin(p.x+p.y+1.0), sin(p.x+p.y) + cos(p.x+p.y));`,
    
    `vec2 p = mod(uv * {scale}, 1.0) - 0.5; p *= rot(time * {speed}); 
    vec2 d_box = abs(p) - vec2({amp}); float dist = length(max(d_box,0.0)) + min(max(d_box.x,d_box.y),0.0);
    float t = smoothstep(0.05, 0.0, abs(dist) - {amp}*0.5);
    c = vec3(t); c *= vec3(sin(uv.x * 10.0 + time), cos(uv.y * 10.0 + time), 1.0);`,
    
    `vec2 p = uv * {scale}; 
    float r = noise3(vec3(p.x, p.y, time * {speed}));
    float g = noise3(vec3(p.x, p.y + 0.2, time * {speed} + 100.0));
    float b = noise3(vec3(p.x, p.y + 0.4, time * {speed} + 200.0));
    c = vec3(r, g, b) * {amp};`,
    
    `float cell = cellular(uv * {scale}, {speed});
    float t = smoothstep({amp}, {amp} + 0.1, cell);
    c = vec3(t) * vec3(0.5 + 0.5*sin(time + uv.xyx + vec3(0,2,4)));`,
    
    `vec2 p = uv; float r = 0.0, g = 0.0, b = 0.0;
    for(float i=1.0; i<6.0; i++) {
        vec2 m = vec2(sin(time * {speed} + i * {freq}) * {amp}, cos(time * {speed} * 0.8 + i * {freq}) * {amp});
        r += sin(length(m - p) * 100.0 - time * 10.0) * 0.5;
        g += sin(length(m - p) * 102.0 - time * 10.0) * 0.5;
        b += sin(length(m - p) * 104.0 - time * 10.0) * 0.5;
    }
    c = vec3(r, g, b);`,

    `float div = {scale}; 
    vec2 p = uv * rot(time * {speed});
    float r = mod(p.x + mod(time * {speed}, 1.0), 1.0 / div) * div;
    float g = mod(p.y + mod(time * {speed} * 1.5, 1.0), 1.0 / div) * div;
    float b = mod(p.x - mod(time * {speed} * 2.0, 1.0), 1.0 / div) * div;
    c = vec3(r, g, b);`,

    `float l = length(uv);
    float r = abs(pow(sin(l * {scale} - time * {speed}), {freq}));
    float g = abs(pow(sin(l * {scale} - time * {speed} - 0.5), {freq}));
    float b = abs(pow(cos(l * {scale} - time * {speed} - 1.0), {freq}));
    c = vec3(r, g, b);`,

    `float n1 = fbm(uv * {scale} + vec2(time * {speed}, 0.0));
    float n2 = fbm(uv * {scale} * 2.0 + vec2(0.0, time * {speed} * 1.5));
    float n3 = fbm(uv * {scale} * 4.0 - vec2(time * {speed}, time * {speed}));
    c = mod(vec3(n1, n2, n3) * {freq}, 1.0) * {amp};`,
    
    `float a = atan(uv.y, uv.x); float r = length(uv);
    c = hsb2rgb(vec3((a / (PI * 2.0)) + time * {speed} + fbm(uv * {scale}), r * {freq}, 1.0));`,

    `float l1 = length(uv - vec2({amp}, 0.0));
    float l2 = length(uv + vec2({amp}, 0.0));
    float l3 = length(uv + vec2(0.0, {amp}));
    float v = sin(l1 * {scale} - time * {speed}) + sin(l2 * {scale} - time * {speed}) + sin(l3 * {scale} - time * {speed});
    c = vec3(v * 0.33 + 0.5); c = mod(c * {freq}, 1.0);`,
    
    `vec2 p = uv * {scale}; p *= rot(noise(p + time * {speed}) * {amp});
    float t = smoothstep(0.0, 0.5 + 0.2, abs(sin(p.x * PI) * sin(p.y * PI)));
    c = vec3(t) * vec3(0.1, 0.8, 0.9);`,
    
    `vec2 p = uv; float z = time * {speed}; c = vec3(0.0);
    for(int i=0; i<3; i++) {
        p = fract(p * {scale}) - 0.5; p *= rot(z);
        float d = length(p);
        c[i] = {amp} / abs(d - 0.2);
    }`
];

const postEffects = [
    "vec4 finalColor = vec4(c, 1.0);",
    "vec4 finalColor = vec4(1.0 - c, 1.0);",
    "vec4 finalColor = vec4(smoothstep(0.1, 0.9, c), 1.0);",
    "vec4 finalColor = vec4(c * (0.8 + 0.2 * sin(time * 20.0)), 1.0);",
    "vec4 finalColor = vec4(c.g, c.b, c.r, 1.0);",
    "vec4 finalColor = vec4(mod(c * 2.0, 1.0), 1.0);",
    "vec4 finalColor = vec4(abs(sin(c * 10.0 + time)), 1.0);"
];

function rand(min, max) { return Math.random() * (max - min) + min; }

function generate_shader() {
    let coordMod = coordsModifiers[Math.floor(Math.random() * coordsModifiers.length)]
        .replace(/{scale}/g, rand(2.0, 10.0).toFixed(2))
        .replace(/{speed}/g, rand(0.5, 4.0).toFixed(2))
        .replace(/{freq}/g, rand(2.0, 15.0).toFixed(2))
        .replace(/{amp}/g, rand(0.05, 0.5).toFixed(2));

    let pattern = patterns[Math.floor(Math.random() * patterns.length)]
        .replace(/{scale}/g, rand(2.0, 30.0).toFixed(2))
        .replace(/{speed}/g, rand(0.5, 6.0).toFixed(2))
        .replace(/{freq}/g, rand(2.0, 20.0).toFixed(2))
        .replace(/{amp}/g, rand(0.1, 3.0).toFixed(2));

    let postEffect = postEffects[Math.floor(Math.random() * postEffects.length)];

    let main_body = `void main() {
    ${coordMod}
    
    vec3 c = vec3(0.0);
    {
        ${pattern}
    }
    
    ${postEffect}
    fragColor = TDOutputSwizzle(finalColor);
}
`;
    return header + main_body;
}

for (let i = 0; i < 1000; i++) {
    let shader_code = generate_shader();
    let filename = path.join(OUTPUT_DIR, String(i).padStart(4, '0') + ".frag");
    fs.writeFileSync(filename, shader_code);
}

console.log("Regenerated 1000 shaders safely in " + OUTPUT_DIR);
