uniform float time;
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
void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
    vec2 p0 = uv;
    { float a_0_0 = atan(p0.y, p0.x); float r_0_0 = length(p0); a_0_0 = mod(a_0_0, TAU / 4.5) - PI / 5.9; p0 = vec2(cos(a_0_0), sin(a_0_0)) * r_0_0; }
    p0 = mod(p0 * 7.5 + vec2(time * -0.93), 1.0) - 0.5;
    p0 = fract(p0 * 5.2) - 0.5;
    vec2 p1 = uv;
    p1 *= 1.0 + 0.35 * sin(length(p1) * 5.4 - time * 4.6);
    { float fov_1_1 = 0.5; vec3 p3_1_1 = vec3(p1.x, fov_1_1, p1.y - 0.32); p1 = vec2(p3_1_1.x/p3_1_1.z, p3_1_1.y/p3_1_1.z); p1.y += time * 0.8; }
    { float a_1_2 = atan(p1.y, p1.x); float r_1_2 = length(p1); a_1_2 = mod(a_1_2, TAU / 6.3) - PI / 3.2; p1 = vec2(cos(a_1_2), sin(a_1_2)) * r_1_2; }
    p1 *= 1.0 + 0.37 * sin(length(p1) * 15.7 - time * 6.6);
    vec2 p2 = uv;
    p2 = fract(p2 * 2.8) - 0.5;
    float v = mod(min((
            sin(length(p0 - vec2(0.61, -0.50)) * 32.4 - time * 9.6) + sin(length(p0 - vec2(0.16, -0.64)) * 26.1 - time * 9.3) + sin(length(p0 - vec2(-0.29, -0.59)) * 11.9 - time * 4.6)
        ) / 3.0, sdBox(p1, vec2(0.58, 0.49))), fbm(p2 * 3.4 + time * 0.79) + 0.001);
    v = sin(v * 25.5 + time * 4.4) * 0.5 + 0.5;
    v = abs(0.097 / (v + 0.001));
    vec3 col = pal(v + time * 0.92, vec3(0.5), vec3(0.5), vec3(1.0, 0.7, 0.4), vec3(0.0, 0.15, 0.20));
    col.r = fract(col.r + sin(uv.y * 50.0 + time) * 0.1);
    col.g = fract(col.g + cos(uv.x * 40.0 + time) * 0.1);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
