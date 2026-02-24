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
    p0.y += cos(p0.x * 14.8 - time * 3.4) * 0.19;
    p0 = mod(p0 * 6.6 + vec2(time * -0.04), 1.0) - 0.5;
    { float a_0_2 = atan(p0.y, p0.x); float r_0_2 = length(p0); a_0_2 = mod(a_0_2, TAU / 4.6) - PI / 6.1; p0 = vec2(cos(a_0_2), sin(a_0_2)) * r_0_2; }
    p0 = fract(p0 * 9.3) - 0.5;
    vec2 p1 = uv;
    p1 = abs(p1) - 0.22;
    vec2 p2 = uv;
    p2 = abs(p2) - 0.41;
    p2 *= rot(time * -0.43);
    float v = min(max(sdBox(p0, vec2(0.23, 0.28)), (
            sin(length(p1 - vec2(-0.09, 0.52)) * 15.9 - time * 8.2) + sin(length(p1 - vec2(0.73, 0.61)) * 25.1 - time * 3.9) + sin(length(p1 - vec2(-0.22, 0.06)) * 13.2 - time * 2.9) + sin(length(p1 - vec2(-0.04, -0.37)) * 11.3 - time * 9.4) + sin(length(p1 - vec2(0.52, 0.78)) * 25.1 - time * 4.6) + sin(length(p1 - vec2(-0.39, 0.10)) * 16.8 - time * 4.3)
        ) / 6.0), fbm(p2 * 4.0 + time * 0.91));
    v = pow(abs(v), 2.43);
    vec3 col = pal(v + time * 0.67, vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 0.5), vec3(0.8, 0.90, 0.30));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
