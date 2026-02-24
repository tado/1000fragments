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
    p0.y += cos(p0.x * 6.1 - time * 3.6) * 0.27;
    p0.x += sin(p0.y * 8.9 + time * 1.2) * 0.19;
    { float fov_0_2 = 0.5; vec3 p3_0_2 = vec3(p0.x, fov_0_2, p0.y - -0.08); p0 = vec2(p3_0_2.x/p3_0_2.z, p3_0_2.y/p3_0_2.z); p0.y += time * 2.8; }
    p0 = fract(p0 * 9.5) - 0.5;
    vec2 p1 = uv;
    p1 = fract(p1 * 8.1) - 0.5;
    { float a_1_1 = atan(p1.y, p1.x); float r_1_1 = length(p1); a_1_1 = mod(a_1_1, TAU / 8.0) - PI / 5.0; p1 = vec2(cos(a_1_1), sin(a_1_1)) * r_1_1; }
    p1 = fract(p1 * 5.0) - 0.5;
    p1 *= 1.0 + 0.40 * sin(length(p1) * 19.5 - time * 7.3);
    vec2 p2 = uv;
    p2.x += sin(p2.y * 5.4 + time * 4.7) * 0.24;
    p2.x += sin(p2.y * 7.9 + time * 2.9) * 0.07;
    p2 = abs(p2) - 0.22;
    p2.x += sin(p2.y * 9.2 + time * 4.5) * 0.26;
    float v = abs(min(length(p0) - 0.69, abs(sin(atan(p1.y, p1.x) * 9.0 + time * 2.9)) * length(p1)) - (
            sin(length(p2 - vec2(-0.36, 0.68)) * 28.6 - time * 3.2) + sin(length(p2 - vec2(-0.57, 0.21)) * 30.4 - time * 8.2) + sin(length(p2 - vec2(-0.07, -0.35)) * 14.4 - time * 7.3) + sin(length(p2 - vec2(-0.60, -0.29)) * 15.6 - time * 6.8) + sin(length(p2 - vec2(0.79, -0.38)) * 24.3 - time * 3.7) + sin(length(p2 - vec2(-0.01, -0.20)) * 21.8 - time * 4.8)
        ) / 6.0);
    v = sin(v * 11.9 + time * 6.6) * 0.5 + 0.5;
    vec3 col = pal(v + time * 0.44, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.33, 0.67));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
