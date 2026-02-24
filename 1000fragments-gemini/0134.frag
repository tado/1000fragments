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
    p0.y += cos(p0.x * 14.9 - time * 4.1) * 0.11;
    p0 *= 1.0 + 0.98 * sin(length(p0) * 8.2 - time * 3.1);
    p0 *= 1.0 + 0.52 * sin(length(p0) * 12.9 - time * 3.4);
    vec2 p1 = uv;
    p1 *= 1.0 + 0.48 * sin(length(p1) * 10.6 - time * 7.5);
    p1 *= rot(time * -1.89);
    vec2 p2 = uv;
    p2 = mod(p2 * 2.0 + vec2(time * -0.27), 1.0) - 0.5;
    p2.y += cos(p2.x * 13.3 - time * 4.6) * 0.06;
    p2 *= 1.0 + 0.65 * sin(length(p2) * 19.0 - time * 7.5);
    float v = (min(sin(p0.x * 12.7 + time * 1.8) * cos(p0.y * 29.0 + time * 2.0), sin(p1.x * 8.4 + time * 4.2) * cos(p1.y * 10.6 + time * 2.5)) * fbm(p2 * 6.4 + time * 1.45));
    v = step(0.55, v);
    v = sin(v * 13.1 + time * 4.0) * 0.5 + 0.5;
    v = abs(0.079 / (v + 0.001));
    vec3 col = pal(v + time * 0.47, vec3(0.5), vec3(0.5), vec3(1.0, 0.7, 0.4), vec3(0.0, 0.15, 0.20));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
