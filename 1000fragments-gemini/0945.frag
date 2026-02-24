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
    p0 *= rot(time * 0.25);
    p0 = mod(p0 * 8.0 + vec2(time * 0.29), 1.0) - 0.5;
    { float fov_0_2 = 0.5; vec3 p3_0_2 = vec3(p0.x, fov_0_2, p0.y - 0.01); p0 = vec2(p3_0_2.x/p3_0_2.z, p3_0_2.y/p3_0_2.z); p0.y += time * 2.3; }
    p0 = abs(p0) - 0.49;
    vec2 p1 = uv;
    { float r_1_0 = length(p1); float a_1_0 = atan(p1.y, p1.x); p1 = vec2(log(r_1_0) - time * 1.16, a_1_0 * 4.0 / PI); }
    p1 = abs(p1) - 0.20;
    p1 = mod(p1 * 3.1 + vec2(time * 0.90), 1.0) - 0.5;
    p1 = mod(p1 * 6.1 + vec2(time * 0.47), 1.0) - 0.5;
    vec2 p2 = uv;
    p2 *= rot(time * 1.91);
    p2 = mod(p2 * 7.3 + vec2(time * -0.33), 1.0) - 0.5;
    { float fov_2_2 = 0.5; vec3 p3_2_2 = vec3(p2.x, fov_2_2, p2.y - 0.36); p2 = vec2(p3_2_2.x/p3_2_2.z, p3_2_2.y/p3_2_2.z); p2.y += time * 0.8; }
    { float r_2_3 = length(p2); float a_2_3 = atan(p2.y, p2.x); p2 = vec2(log(r_2_3) - time * 0.56, a_2_3 * 4.0 / PI); }
    float v = mod(max(cellular(p0 * 8.4), length(p1) - 0.13), sdHex(p2, 0.69) + 0.001);
    v = sin(v * 13.0 + time * 9.9) * 0.5 + 0.5;
    vec3 col = pal(v + time * 0.94, vec3(0.2, 0.1, 0.4), vec3(0.8, 0.9, 0.6), vec3(1.0, 1.0, 1.0), vec3(0.5, 0.5, 0.5));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
