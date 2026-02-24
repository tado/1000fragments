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
    p0 *= rot(time * 0.20);
    { float r_0_1 = length(p0); float a_0_1 = atan(p0.y, p0.x); p0 = vec2(log(r_0_1) - time * 0.47, a_0_1 * 1.0 / PI); }
    p0.x += sin(p0.y * 9.9 + time * 2.7) * 0.27;
    p0 = mod(p0 * 6.9 + vec2(time * 1.08), 1.0) - 0.5;
    vec2 p1 = uv;
    p1 *= rot(time * -0.40);
    p1 *= rot(time * 0.45);
    p1 = fract(p1 * 2.2) - 0.5;
    { float fov_1_3 = 0.5; vec3 p3_1_3 = vec3(p1.x, fov_1_3, p1.y - -0.22); p1 = vec2(p3_1_3.x/p3_1_3.z, p3_1_3.y/p3_1_3.z); p1.y += time * 2.1; }
    vec2 p2 = uv;
    p2 *= rot(time * 1.87);
    { float r_2_1 = length(p2); float a_2_1 = atan(p2.y, p2.x); p2 = vec2(log(r_2_1) - time * 0.34, a_2_1 * 4.0 / PI); }
    { float fov_2_2 = 0.5; vec3 p3_2_2 = vec3(p2.x, fov_2_2, p2.y - -0.34); p2 = vec2(p3_2_2.x/p3_2_2.z, p3_2_2.y/p3_2_2.z); p2.y += time * 1.3; }
    p2 *= rot(time * -1.26);
    float v = ((cellular(p0 * 8.6) * (
            sin(length(p1 - vec2(0.64, -0.71)) * 36.2 - time * 3.0) + sin(length(p1 - vec2(-0.34, -0.75)) * 20.8 - time * 8.4) + sin(length(p1 - vec2(0.68, -0.47)) * 18.2 - time * 5.5) + sin(length(p1 - vec2(0.47, 0.09)) * 35.2 - time * 9.7)
        ) / 4.0) * fract(length(p2) * 7.6 - time * 1.1));
    v = abs(0.077 / (v + 0.001));
    vec3 col = pal(v + time * 0.68, vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.10, 0.20));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
