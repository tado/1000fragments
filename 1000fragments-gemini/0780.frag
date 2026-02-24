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
    p0.y += cos(p0.x * 12.1 - time * 5.0) * 0.15;
    vec2 p1 = uv;
    p1 *= 1.0 + 0.89 * sin(length(p1) * 15.2 - time * 5.0);
    p1 = abs(p1) - 0.40;
    p1 = mod(p1 * 7.6 + vec2(time * 1.69), 1.0) - 0.5;
    p1 = fract(p1 * 7.9) - 0.5;
    float v = mod((
            sin(length(p0 - vec2(-0.74, -0.71)) * 36.1 - time * 5.2) + sin(length(p0 - vec2(-0.63, -0.58)) * 26.1 - time * 5.5) + sin(length(p0 - vec2(0.06, -0.19)) * 34.1 - time * 8.0) + sin(length(p0 - vec2(0.23, -0.19)) * 13.5 - time * 8.2) + sin(length(p0 - vec2(-0.80, 0.68)) * 20.6 - time * 9.6) + sin(length(p0 - vec2(0.55, -0.09)) * 14.6 - time * 3.9)
        ) / 6.0, (
            sin(length(p1 - vec2(0.22, -0.56)) * 31.5 - time * 2.5) + sin(length(p1 - vec2(0.21, 0.26)) * 34.8 - time * 6.4) + sin(length(p1 - vec2(0.63, -0.09)) * 11.8 - time * 9.8) + sin(length(p1 - vec2(0.26, 0.55)) * 34.7 - time * 7.2)
        ) / 4.0 + 0.001);
    v = sin(v * 22.3 + time * 2.7) * 0.5 + 0.5;
    v = sin(v * 47.6 + time * 6.6) * 0.5 + 0.5;
    v = abs(0.078 / (v + 0.001));
    vec3 col = pal(v + time * 0.39, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.10, 0.20));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
