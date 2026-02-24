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
    p0 *= 1.0 + 0.64 * sin(length(p0) * 9.3 - time * 2.6);
    p0.x += sin(p0.y * 7.1 + time * 3.7) * 0.18;
    vec2 p1 = uv;
    p1 *= 1.0 + 0.68 * sin(length(p1) * 11.9 - time * 3.5);
    vec2 p2 = uv;
    p2.x += sin(p2.y * 5.7 + time * 2.9) * 0.11;
    { float r_2_1 = length(p2); float a_2_1 = atan(p2.y, p2.x); p2 = vec2(log(r_2_1) - time * 1.46, a_2_1 * 1.0 / PI); }
    float v = abs(mix(fract(length(p0) * 19.6 - time * 2.9), sin(p1.x * 8.4 + time * 1.2) * cos(p1.y * 10.1 + time * 4.3), 0.5 + 0.5 * sin(time)) - (
            sin(length(p2 - vec2(0.12, 0.41)) * 10.7 - time * 5.3) + sin(length(p2 - vec2(-0.71, -0.35)) * 19.7 - time * 3.2) + sin(length(p2 - vec2(-0.20, 0.06)) * 26.2 - time * 6.6) + sin(length(p2 - vec2(-0.42, -0.29)) * 12.9 - time * 8.6) + sin(length(p2 - vec2(-0.56, 0.04)) * 17.3 - time * 9.3) + sin(length(p2 - vec2(0.48, -0.52)) * 30.8 - time * 4.6) + sin(length(p2 - vec2(0.57, 0.48)) * 32.9 - time * 3.4)
        ) / 7.0);
    v = smoothstep(0.01, 0.67, v);
    vec3 col = pal(v + time * 0.87, vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.10, 0.20));
    col.r = fract(col.r + sin(uv.y * 50.0 + time) * 0.1);
    col.g = fract(col.g + cos(uv.x * 40.0 + time) * 0.1);
    col *= 1.0 - smoothstep(0.5, 1.5, length((gl_FragCoord.xy / resolution.xy) - 0.5) * 2.0);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
