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
    p0 = abs(p0) - 0.16;
    p0.x += sin(p0.y * 4.0 + time * 1.2) * 0.20;
    p0 *= 1.0 + 0.36 * sin(length(p0) * 12.8 - time * 4.8);
    p0 = fract(p0 * 5.6) - 0.5;
    vec2 p1 = uv;
    { float r_1_0 = length(p1); float a_1_0 = atan(p1.y, p1.x); p1 = vec2(log(r_1_0) - time * 0.39, a_1_0 * 2.0 / PI); }
    p1 *= 1.0 + 0.30 * sin(length(p1) * 8.5 - time * 2.2);
    p1 = abs(p1) - 0.32;
    vec2 p2 = uv;
    p2 = mod(p2 * 4.3 + vec2(time * -0.61), 1.0) - 0.5;
    { float r_2_1 = length(p2); float a_2_1 = atan(p2.y, p2.x); p2 = vec2(log(r_2_1) - time * 1.30, a_2_1 * 3.0 / PI); }
    p2.y += cos(p2.x * 12.1 - time * 4.3) * 0.25;
    { float fov_2_3 = 0.5; vec3 p3_2_3 = vec3(p2.x, fov_2_3, p2.y - -0.44); p2 = vec2(p3_2_3.x/p3_2_3.z, p3_2_3.y/p3_2_3.z); p2.y += time * 1.4; }
    float v = max(mod((
            sin(length(p0 - vec2(-0.06, 0.29)) * 30.5 - time * 9.4) + sin(length(p0 - vec2(0.65, -0.38)) * 11.7 - time * 4.1) + sin(length(p0 - vec2(0.22, -0.09)) * 34.2 - time * 4.2)
        ) / 3.0, abs(sin(atan(p1.y, p1.x) * 9.0 + time * 2.4)) * length(p1) + 0.001), abs(sin(atan(p2.y, p2.x) * 11.0 + time * 4.2)) * length(p2));
    v = fract(v * 4.2);
    vec3 col = pal(v + time * 0.54, vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 0.5), vec3(0.8, 0.90, 0.30));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
