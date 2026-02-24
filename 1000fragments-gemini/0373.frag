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
    p0 *= 1.0 + 0.28 * sin(length(p0) * 14.4 - time * 7.0);
    p0 *= 1.0 + 0.91 * sin(length(p0) * 9.4 - time * 6.7);
    p0 *= rot(time * -1.44);
    vec2 p1 = uv;
    { float a_1_0 = atan(p1.y, p1.x); float r_1_0 = length(p1); a_1_0 = mod(a_1_0, TAU / 5.8) - PI / 3.1; p1 = vec2(cos(a_1_0), sin(a_1_0)) * r_1_0; }
    p1 = fract(p1 * 9.7) - 0.5;
    float v = abs((
            sin(length(p0 - vec2(0.38, -0.50)) * 23.7 - time * 7.3) + sin(length(p0 - vec2(-0.32, 0.47)) * 29.4 - time * 5.1) + sin(length(p0 - vec2(-0.63, -0.75)) * 25.6 - time * 2.1) + sin(length(p0 - vec2(-0.37, -0.00)) * 27.1 - time * 4.9) + sin(length(p0 - vec2(-0.73, 0.79)) * 17.2 - time * 2.0) + sin(length(p0 - vec2(-0.15, -0.33)) * 33.3 - time * 6.2) + sin(length(p0 - vec2(0.38, 0.17)) * 19.3 - time * 2.9)
        ) / 7.0 - (
            sin(length(p1 - vec2(0.14, -0.05)) * 27.1 - time * 4.6) + sin(length(p1 - vec2(0.44, 0.46)) * 29.0 - time * 7.0) + sin(length(p1 - vec2(-0.15, 0.65)) * 28.6 - time * 2.9) + sin(length(p1 - vec2(0.75, 0.07)) * 19.8 - time * 6.6) + sin(length(p1 - vec2(0.37, -0.56)) * 24.8 - time * 3.1)
        ) / 5.0);
    v = step(0.47, v);
    v = pow(abs(v), 1.51);
    v = sin(v * 36.6 + time * 2.1) * 0.5 + 0.5;
    vec3 col = pal(v + time * 0.19, vec3(0.8, 0.5, 0.4), vec3(0.2, 0.4, 0.2), vec3(2.0, 1.0, 1.0), vec3(0.0, 0.25, 0.25));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
