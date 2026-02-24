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
    p0 = abs(p0) - 0.37;
    p0 *= rot(time * 1.62);
    p0.x += sin(p0.y * 10.9 + time * 1.4) * 0.09;
    { float a_0_3 = atan(p0.y, p0.x); float r_0_3 = length(p0); a_0_3 = mod(a_0_3, TAU / 3.5) - PI / 3.1; p0 = vec2(cos(a_0_3), sin(a_0_3)) * r_0_3; }
    float v = (
            sin(length(p0 - vec2(0.73, -0.08)) * 33.2 - time * 3.7) + sin(length(p0 - vec2(0.02, 0.77)) * 13.0 - time * 7.8) + sin(length(p0 - vec2(0.48, -0.75)) * 27.5 - time * 2.5) + sin(length(p0 - vec2(-0.26, 0.12)) * 36.0 - time * 3.6) + sin(length(p0 - vec2(0.03, -0.74)) * 22.8 - time * 2.7) + sin(length(p0 - vec2(0.38, -0.46)) * 29.4 - time * 6.6) + sin(length(p0 - vec2(-0.43, 0.70)) * 25.3 - time * 8.4)
        ) / 7.0;
    v = fract(v * 4.3);
    v = sin(v * 35.8 + time * 5.9) * 0.5 + 0.5;
    vec3 col = pal(v + time * 0.28, vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.10, 0.20));
    col.r = fract(col.r + sin(uv.y * 50.0 + time) * 0.1);
    col.g = fract(col.g + cos(uv.x * 40.0 + time) * 0.1);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
