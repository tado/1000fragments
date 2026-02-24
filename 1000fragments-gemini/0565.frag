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
    { float a_0_0 = atan(p0.y, p0.x); float r_0_0 = length(p0); a_0_0 = mod(a_0_0, TAU / 4.5) - PI / 5.4; p0 = vec2(cos(a_0_0), sin(a_0_0)) * r_0_0; }
    { float r_0_1 = length(p0); float a_0_1 = atan(p0.y, p0.x); p0 = vec2(log(r_0_1) - time * 0.96, a_0_1 * 4.0 / PI); }
    p0 = mod(p0 * 3.1 + vec2(time * 1.33), 1.0) - 0.5;
    vec2 p1 = uv;
    p1 *= rot(time * 0.28);
    vec2 p2 = uv;
    { float r_2_0 = length(p2); float a_2_0 = atan(p2.y, p2.x); p2 = vec2(log(r_2_0) - time * 0.99, a_2_0 * 1.0 / PI); }
    { float a_2_1 = atan(p2.y, p2.x); float r_2_1 = length(p2); a_2_1 = mod(a_2_1, TAU / 3.0) - PI / 4.5; p2 = vec2(cos(a_2_1), sin(a_2_1)) * r_2_1; }
    { float a_2_2 = atan(p2.y, p2.x); float r_2_2 = length(p2); a_2_2 = mod(a_2_2, TAU / 5.2) - PI / 3.8; p2 = vec2(cos(a_2_2), sin(a_2_2)) * r_2_2; }
    p2.x += sin(p2.y * 14.5 + time * 5.0) * 0.19;
    float v = mix(mix(fbm(p0 * 3.6 + time * 1.14), sdBox(p1, vec2(0.58, 0.24)), 0.5 + 0.5 * sin(time)), (
            sin(length(p2 - vec2(0.46, -0.78)) * 28.2 - time * 3.8) + sin(length(p2 - vec2(-0.33, 0.55)) * 32.9 - time * 8.4)
        ) / 2.0, 0.5 + 0.5 * sin(time));
    v = fract(v * 7.5);
    v = abs(0.057 / (v + 0.001));
    v = sin(v * 38.8 + time * 4.4) * 0.5 + 0.5;
    vec3 col = pal(v + time * 0.23, vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 0.5), vec3(0.8, 0.90, 0.30));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
