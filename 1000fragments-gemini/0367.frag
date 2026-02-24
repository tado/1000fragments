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
    p0 *= rot(time * -0.22);
    p0 *= 1.0 + 0.63 * sin(length(p0) * 6.5 - time * 3.0);
    vec2 p1 = uv;
    { float a_1_0 = atan(p1.y, p1.x); float r_1_0 = length(p1); a_1_0 = mod(a_1_0, TAU / 3.1) - PI / 3.9; p1 = vec2(cos(a_1_0), sin(a_1_0)) * r_1_0; }
    { float a_1_1 = atan(p1.y, p1.x); float r_1_1 = length(p1); a_1_1 = mod(a_1_1, TAU / 4.6) - PI / 4.8; p1 = vec2(cos(a_1_1), sin(a_1_1)) * r_1_1; }
    { float r_1_2 = length(p1); float a_1_2 = atan(p1.y, p1.x); p1 = vec2(log(r_1_2) - time * 0.61, a_1_2 * 2.0 / PI); }
    float v = min((
            sin(length(p0 - vec2(0.48, 0.26)) * 30.2 - time * 3.0) + sin(length(p0 - vec2(0.10, -0.78)) * 37.7 - time * 5.2)
        ) / 2.0, (
            sin(length(p1 - vec2(-0.54, -0.62)) * 13.5 - time * 6.9) + sin(length(p1 - vec2(-0.78, 0.08)) * 34.4 - time * 2.7) + sin(length(p1 - vec2(0.62, -0.13)) * 25.8 - time * 4.5) + sin(length(p1 - vec2(-0.49, 0.22)) * 31.1 - time * 7.8) + sin(length(p1 - vec2(-0.60, 0.69)) * 16.3 - time * 4.7) + sin(length(p1 - vec2(-0.40, 0.74)) * 16.6 - time * 2.1)
        ) / 6.0);
    v = fract(v * 9.4);
    v = fract(v * 5.1);
    vec3 col = pal(v + time * 0.21, vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 0.5), vec3(0.8, 0.90, 0.30));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
