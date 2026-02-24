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
    p0.y += cos(p0.x * 5.5 - time * 1.3) * 0.14;
    { float fov_0_1 = 0.5; vec3 p3_0_1 = vec3(p0.x, fov_0_1, p0.y - 0.09); p0 = vec2(p3_0_1.x/p3_0_1.z, p3_0_1.y/p3_0_1.z); p0.y += time * 1.9; }
    p0 = abs(p0) - 0.36;
    vec2 p1 = uv;
    p1 *= 1.0 + 0.60 * sin(length(p1) * 5.2 - time * 5.4);
    { float a_1_1 = atan(p1.y, p1.x); float r_1_1 = length(p1); a_1_1 = mod(a_1_1, TAU / 6.7) - PI / 7.6; p1 = vec2(cos(a_1_1), sin(a_1_1)) * r_1_1; }
    { float a_1_2 = atan(p1.y, p1.x); float r_1_2 = length(p1); a_1_2 = mod(a_1_2, TAU / 4.4) - PI / 7.7; p1 = vec2(cos(a_1_2), sin(a_1_2)) * r_1_2; }
    vec2 p2 = uv;
    { float fov_2_0 = 0.5; vec3 p3_2_0 = vec3(p2.x, fov_2_0, p2.y - 0.31); p2 = vec2(p3_2_0.x/p3_2_0.z, p3_2_0.y/p3_2_0.z); p2.y += time * 1.3; }
    p2 = mod(p2 * 4.8 + vec2(time * -0.16), 1.0) - 0.5;
    float v = min(max(length(p0) - 0.47, cellular(p1 * 7.5)), abs(sin(atan(p2.y, p2.x) * 4.0 + time * 3.6)) * length(p2));
    v = step(0.54, v);
    v = pow(abs(v), 4.94);
    vec3 col = pal(v + time * 0.15, vec3(0.8, 0.5, 0.4), vec3(0.2, 0.4, 0.2), vec3(2.0, 1.0, 1.0), vec3(0.0, 0.25, 0.25));
    col.r = fract(col.r + sin(uv.y * 50.0 + time) * 0.1);
    col.g = fract(col.g + cos(uv.x * 40.0 + time) * 0.1);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
