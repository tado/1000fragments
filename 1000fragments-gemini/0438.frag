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
    p0 = mod(p0 * 5.9 + vec2(time * 0.96), 1.0) - 0.5;
    p0 = abs(p0) - 0.38;
    p0 *= 1.0 + 0.27 * sin(length(p0) * 10.8 - time * 3.1);
    p0 *= 1.0 + 0.60 * sin(length(p0) * 17.0 - time * 4.2);
    vec2 p1 = uv;
    p1 = fract(p1 * 7.6) - 0.5;
    { float r_1_1 = length(p1); float a_1_1 = atan(p1.y, p1.x); p1 = vec2(log(r_1_1) - time * 0.29, a_1_1 * 2.0 / PI); }
    { float a_1_2 = atan(p1.y, p1.x); float r_1_2 = length(p1); a_1_2 = mod(a_1_2, TAU / 5.1) - PI / 6.6; p1 = vec2(cos(a_1_2), sin(a_1_2)) * r_1_2; }
    { float a_1_3 = atan(p1.y, p1.x); float r_1_3 = length(p1); a_1_3 = mod(a_1_3, TAU / 3.1) - PI / 3.3; p1 = vec2(cos(a_1_3), sin(a_1_3)) * r_1_3; }
    vec2 p2 = uv;
    p2.x += sin(p2.y * 3.5 + time * 2.7) * 0.22;
    { float a_2_1 = atan(p2.y, p2.x); float r_2_1 = length(p2); a_2_1 = mod(a_2_1, TAU / 7.4) - PI / 4.3; p2 = vec2(cos(a_2_1), sin(a_2_1)) * r_2_1; }
    { float r_2_2 = length(p2); float a_2_2 = atan(p2.y, p2.x); p2 = vec2(log(r_2_2) - time * 0.63, a_2_2 * 2.0 / PI); }
    p2 = abs(p2) - 0.41;
    float v = (mix((
            sin(length(p0 - vec2(0.26, -0.60)) * 35.2 - time * 7.8) + sin(length(p0 - vec2(0.57, -0.67)) * 22.4 - time * 7.8) + sin(length(p0 - vec2(-0.28, 0.75)) * 30.7 - time * 3.5) + sin(length(p0 - vec2(-0.30, -0.35)) * 32.7 - time * 4.3) + sin(length(p0 - vec2(-0.26, 0.48)) * 22.3 - time * 3.8) + sin(length(p0 - vec2(0.58, 0.33)) * 18.3 - time * 9.4) + sin(length(p0 - vec2(-0.10, 0.04)) * 32.1 - time * 9.6)
        ) / 7.0, sdBox(p1, vec2(0.12, 0.13)), 0.5 + 0.5 * sin(time)) * fbm(p2 * 3.2 + time * 1.31));
    v = smoothstep(0.14, 0.45, v);
    vec3 col = pal(v + time * 0.45, vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 0.5), vec3(0.8, 0.90, 0.30));
    col *= 1.0 - smoothstep(0.5, 1.5, length((gl_FragCoord.xy / resolution.xy) - 0.5) * 2.0);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
