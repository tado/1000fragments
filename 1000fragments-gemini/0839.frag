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
    p0 = mod(p0 * 6.1 + vec2(time * 1.25), 1.0) - 0.5;
    p0 = mod(p0 * 3.2 + vec2(time * 0.51), 1.0) - 0.5;
    p0 = mod(p0 * 2.3 + vec2(time * -0.37), 1.0) - 0.5;
    vec2 p1 = uv;
    p1.y += cos(p1.x * 13.7 - time * 4.9) * 0.18;
    p1 = abs(p1) - 0.30;
    { float r_1_2 = length(p1); float a_1_2 = atan(p1.y, p1.x); p1 = vec2(log(r_1_2) - time * 0.22, a_1_2 * 5.0 / PI); }
    vec2 p2 = uv;
    p2.y += cos(p2.x * 10.5 - time * 2.6) * 0.30;
    p2.x += sin(p2.y * 13.7 + time * 5.0) * 0.29;
    p2 *= rot(time * 0.02);
    float v = mix(abs(sdBox(p0, vec2(0.49, 0.16)) - (
            sin(length(p1 - vec2(0.20, 0.47)) * 27.0 - time * 7.2) + sin(length(p1 - vec2(-0.39, 0.32)) * 34.4 - time * 3.1) + sin(length(p1 - vec2(0.54, -0.25)) * 23.9 - time * 7.5) + sin(length(p1 - vec2(-0.80, -0.48)) * 37.1 - time * 3.6) + sin(length(p1 - vec2(0.07, 0.09)) * 36.5 - time * 5.4) + sin(length(p1 - vec2(-0.11, -0.41)) * 31.5 - time * 9.7) + sin(length(p1 - vec2(-0.08, -0.32)) * 36.3 - time * 2.7)
        ) / 7.0), length(p2) - 0.43, 0.5 + 0.5 * sin(time));
    v = pow(abs(v), 3.02);
    v = sin(v * 19.5 + time * 4.4) * 0.5 + 0.5;
    vec3 col = pal(v + time * 0.83, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.10, 0.20));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
