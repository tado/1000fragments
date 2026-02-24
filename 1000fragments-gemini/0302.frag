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
    p0.y += cos(p0.x * 14.7 - time * 3.6) * 0.08;
    { float a_0_1 = atan(p0.y, p0.x); float r_0_1 = length(p0); a_0_1 = mod(a_0_1, TAU / 6.0) - PI / 4.6; p0 = vec2(cos(a_0_1), sin(a_0_1)) * r_0_1; }
    { float fov_0_2 = 0.5; vec3 p3_0_2 = vec3(p0.x, fov_0_2, p0.y - -0.27); p0 = vec2(p3_0_2.x/p3_0_2.z, p3_0_2.y/p3_0_2.z); p0.y += time * 2.1; }
    vec2 p1 = uv;
    { float a_1_0 = atan(p1.y, p1.x); float r_1_0 = length(p1); a_1_0 = mod(a_1_0, TAU / 3.2) - PI / 4.1; p1 = vec2(cos(a_1_0), sin(a_1_0)) * r_1_0; }
    p1 *= rot(time * 0.96);
    p1 *= 1.0 + 0.66 * sin(length(p1) * 14.6 - time * 4.2);
    p1 *= rot(time * -0.88);
    vec2 p2 = uv;
    p2 = mod(p2 * 2.3 + vec2(time * 1.61), 1.0) - 0.5;
    p2 *= 1.0 + 0.25 * sin(length(p2) * 11.9 - time * 6.4);
    p2 = mod(p2 * 6.4 + vec2(time * -1.31), 1.0) - 0.5;
    float v = abs(max(sdHex(p0, 0.49), length(p1) - 0.63) - (
            sin(length(p2 - vec2(-0.35, -0.25)) * 22.6 - time * 6.9) + sin(length(p2 - vec2(-0.63, 0.48)) * 13.3 - time * 9.9) + sin(length(p2 - vec2(-0.43, -0.02)) * 32.8 - time * 4.1) + sin(length(p2 - vec2(0.15, -0.13)) * 34.4 - time * 3.4) + sin(length(p2 - vec2(-0.20, 0.43)) * 12.1 - time * 8.0) + sin(length(p2 - vec2(0.62, 0.39)) * 22.0 - time * 3.1)
        ) / 6.0);
    v = abs(0.063 / (v + 0.001));
    v = pow(abs(v), 2.31);
    v = step(0.89, v);
    vec3 col = pal(v + time * 0.51, vec3(0.8, 0.5, 0.4), vec3(0.2, 0.4, 0.2), vec3(2.0, 1.0, 1.0), vec3(0.0, 0.25, 0.25));
    col.r = fract(col.r + sin(uv.y * 50.0 + time) * 0.1);
    col.g = fract(col.g + cos(uv.x * 40.0 + time) * 0.1);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
