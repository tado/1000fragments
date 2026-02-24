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
    { float r_0_0 = length(p0); float a_0_0 = atan(p0.y, p0.x); p0 = vec2(log(r_0_0) - time * 1.26, a_0_0 * 5.0 / PI); }
    p0 = mod(p0 * 2.9 + vec2(time * -1.95), 1.0) - 0.5;
    p0 = mod(p0 * 2.9 + vec2(time * 1.10), 1.0) - 0.5;
    { float a_0_3 = atan(p0.y, p0.x); float r_0_3 = length(p0); a_0_3 = mod(a_0_3, TAU / 3.2) - PI / 4.9; p0 = vec2(cos(a_0_3), sin(a_0_3)) * r_0_3; }
    vec2 p1 = uv;
    p1 = fract(p1 * 5.8) - 0.5;
    p1 = fract(p1 * 8.1) - 0.5;
    p1 *= 1.0 + 0.49 * sin(length(p1) * 18.4 - time * 6.2);
    p1 = abs(p1) - 0.36;
    vec2 p2 = uv;
    { float fov_2_0 = 0.5; vec3 p3_2_0 = vec3(p2.x, fov_2_0, p2.y - 0.42); p2 = vec2(p3_2_0.x/p3_2_0.z, p3_2_0.y/p3_2_0.z); p2.y += time * 2.0; }
    p2 *= 1.0 + 0.35 * sin(length(p2) * 5.3 - time * 4.0);
    float v = mod(max(abs(sin(atan(p0.y, p0.x) * 12.0 + time * 3.3)) * length(p0), (
            sin(length(p1 - vec2(-0.17, 0.45)) * 35.0 - time * 3.5) + sin(length(p1 - vec2(0.40, -0.55)) * 26.5 - time * 2.1) + sin(length(p1 - vec2(0.54, -0.39)) * 36.4 - time * 5.8) + sin(length(p1 - vec2(-0.42, -0.75)) * 17.6 - time * 6.4) + sin(length(p1 - vec2(-0.22, 0.22)) * 36.2 - time * 7.9)
        ) / 5.0), fbm(p2 * 5.8 + time * 1.03) + 0.001);
    v = step(0.44, v);
    v = fract(v * 3.9);
    v = smoothstep(0.24, 0.77, v);
    vec3 col = pal(v + time * 0.71, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.33, 0.67));
    col *= 1.0 - smoothstep(0.5, 1.5, length((gl_FragCoord.xy / resolution.xy) - 0.5) * 2.0);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
