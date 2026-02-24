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
    p0 = fract(p0 * 2.8) - 0.5;
    { float a_0_1 = atan(p0.y, p0.x); float r_0_1 = length(p0); a_0_1 = mod(a_0_1, TAU / 3.0) - PI / 6.1; p0 = vec2(cos(a_0_1), sin(a_0_1)) * r_0_1; }
    p0 *= 1.0 + 0.31 * sin(length(p0) * 11.8 - time * 4.6);
    p0.x += sin(p0.y * 2.6 + time * 1.7) * 0.09;
    vec2 p1 = uv;
    { float r_1_0 = length(p1); float a_1_0 = atan(p1.y, p1.x); p1 = vec2(log(r_1_0) - time * 0.98, a_1_0 * 1.0 / PI); }
    { float a_1_1 = atan(p1.y, p1.x); float r_1_1 = length(p1); a_1_1 = mod(a_1_1, TAU / 7.2) - PI / 4.8; p1 = vec2(cos(a_1_1), sin(a_1_1)) * r_1_1; }
    p1 = mod(p1 * 4.9 + vec2(time * -0.91), 1.0) - 0.5;
    p1 = abs(p1) - 0.45;
    vec2 p2 = uv;
    { float r_2_0 = length(p2); float a_2_0 = atan(p2.y, p2.x); p2 = vec2(log(r_2_0) - time * 1.06, a_2_0 * 1.0 / PI); }
    { float a_2_1 = atan(p2.y, p2.x); float r_2_1 = length(p2); a_2_1 = mod(a_2_1, TAU / 3.3) - PI / 7.5; p2 = vec2(cos(a_2_1), sin(a_2_1)) * r_2_1; }
    { float r_2_2 = length(p2); float a_2_2 = atan(p2.y, p2.x); p2 = vec2(log(r_2_2) - time * 0.65, a_2_2 * 1.0 / PI); }
    float v = max(mod(sdHex(p0, 0.29), sin(p1.x * 15.1 + time * 1.9) * cos(p1.y * 29.5 + time * 4.0) + 0.001), sin(p2.x * 10.5 + time * 4.6) * cos(p2.y * 23.1 + time * 1.4));
    v = sin(v * 33.0 + time * 8.5) * 0.5 + 0.5;
    vec3 col = pal(v + time * 0.20, vec3(0.8, 0.5, 0.4), vec3(0.2, 0.4, 0.2), vec3(2.0, 1.0, 1.0), vec3(0.0, 0.25, 0.25));
    col.r = fract(col.r + sin(uv.y * 50.0 + time) * 0.1);
    col.g = fract(col.g + cos(uv.x * 40.0 + time) * 0.1);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
