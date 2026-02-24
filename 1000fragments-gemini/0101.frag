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
    p0 *= 1.0 + 1.00 * sin(length(p0) * 6.6 - time * 6.9);
    p0 = mod(p0 * 7.2 + vec2(time * -1.07), 1.0) - 0.5;
    p0 *= 1.0 + 0.54 * sin(length(p0) * 14.5 - time * 4.9);
    vec2 p1 = uv;
    { float a_1_0 = atan(p1.y, p1.x); float r_1_0 = length(p1); a_1_0 = mod(a_1_0, TAU / 4.3) - PI / 4.7; p1 = vec2(cos(a_1_0), sin(a_1_0)) * r_1_0; }
    p1.y += cos(p1.x * 5.4 - time * 4.7) * 0.06;
    p1 = mod(p1 * 6.9 + vec2(time * 1.26), 1.0) - 0.5;
    vec2 p2 = uv;
    p2.x += sin(p2.y * 2.8 + time * 4.5) * 0.07;
    { float fov_2_1 = 0.5; vec3 p3_2_1 = vec3(p2.x, fov_2_1, p2.y - -0.21); p2 = vec2(p3_2_1.x/p3_2_1.z, p3_2_1.y/p3_2_1.z); p2.y += time * 1.8; }
    p2 = fract(p2 * 5.0) - 0.5;
    float v = min(mix(sin(p0.x * 13.8 + time * 4.9) * cos(p0.y * 8.3 + time * 2.3), sdHex(p1, 0.42), 0.5 + 0.5 * sin(time)), (
            sin(length(p2 - vec2(0.64, -0.15)) * 15.5 - time * 9.8) + sin(length(p2 - vec2(0.26, 0.07)) * 24.9 - time * 9.5) + sin(length(p2 - vec2(0.27, -0.41)) * 31.5 - time * 6.3) + sin(length(p2 - vec2(-0.72, -0.41)) * 31.3 - time * 5.2) + sin(length(p2 - vec2(0.62, 0.05)) * 16.9 - time * 4.2) + sin(length(p2 - vec2(0.60, -0.15)) * 37.0 - time * 7.1) + sin(length(p2 - vec2(0.54, -0.50)) * 24.1 - time * 9.5)
        ) / 7.0);
    v = pow(abs(v), 3.86);
    v = step(0.65, v);
    vec3 col = pal(v + time * 0.19, vec3(0.2, 0.1, 0.4), vec3(0.8, 0.9, 0.6), vec3(1.0, 1.0, 1.0), vec3(0.5, 0.5, 0.5));
    col.r = fract(col.r + sin(uv.y * 50.0 + time) * 0.1);
    col.g = fract(col.g + cos(uv.x * 40.0 + time) * 0.1);
    col *= 1.0 - smoothstep(0.5, 1.5, length((gl_FragCoord.xy / resolution.xy) - 0.5) * 2.0);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
