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
    p0 = abs(p0) - 0.30;
    p0 = mod(p0 * 2.7 + vec2(time * -1.69), 1.0) - 0.5;
    vec2 p1 = uv;
    p1.y += cos(p1.x * 7.7 - time * 1.9) * 0.25;
    { float r_1_1 = length(p1); float a_1_1 = atan(p1.y, p1.x); p1 = vec2(log(r_1_1) - time * 1.33, a_1_1 * 4.0 / PI); }
    p1 *= rot(time * 1.86);
    vec2 p2 = uv;
    { float r_2_0 = length(p2); float a_2_0 = atan(p2.y, p2.x); p2 = vec2(log(r_2_0) - time * 0.30, a_2_0 * 2.0 / PI); }
    { float a_2_1 = atan(p2.y, p2.x); float r_2_1 = length(p2); a_2_1 = mod(a_2_1, TAU / 4.9) - PI / 4.3; p2 = vec2(cos(a_2_1), sin(a_2_1)) * r_2_1; }
    p2 *= 1.0 + 0.97 * sin(length(p2) * 9.5 - time * 5.6);
    p2 = mod(p2 * 3.4 + vec2(time * -1.96), 1.0) - 0.5;
    float v = mix(min(sdBox(p0, vec2(0.57, 0.28)), fbm(p1 * 6.4 + time * 1.63)), (
            sin(length(p2 - vec2(0.04, 0.07)) * 14.3 - time * 8.8) + sin(length(p2 - vec2(0.37, 0.23)) * 12.4 - time * 7.4) + sin(length(p2 - vec2(0.33, -0.58)) * 26.0 - time * 3.7) + sin(length(p2 - vec2(0.33, 0.39)) * 37.3 - time * 8.1) + sin(length(p2 - vec2(-0.53, -0.63)) * 34.7 - time * 9.5) + sin(length(p2 - vec2(0.52, 0.29)) * 35.2 - time * 5.8) + sin(length(p2 - vec2(0.73, 0.21)) * 26.8 - time * 9.5)
        ) / 7.0, 0.5 + 0.5 * sin(time));
    v = sin(v * 40.7 + time * 4.8) * 0.5 + 0.5;
    v = fract(v * 7.8);
    vec3 col = pal(v + time * 0.66, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.10, 0.20));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
