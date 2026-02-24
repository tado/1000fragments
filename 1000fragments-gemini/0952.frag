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
    p0 *= 1.0 + 0.30 * sin(length(p0) * 9.6 - time * 6.2);
    p0 *= 1.0 + 0.71 * sin(length(p0) * 7.4 - time * 2.8);
    { float a_0_2 = atan(p0.y, p0.x); float r_0_2 = length(p0); a_0_2 = mod(a_0_2, TAU / 5.6) - PI / 4.9; p0 = vec2(cos(a_0_2), sin(a_0_2)) * r_0_2; }
    vec2 p1 = uv;
    p1 = abs(p1) - 0.13;
    { float r_1_1 = length(p1); float a_1_1 = atan(p1.y, p1.x); p1 = vec2(log(r_1_1) - time * 0.61, a_1_1 * 1.0 / PI); }
    p1 *= rot(time * -1.73);
    vec2 p2 = uv;
    p2.y += cos(p2.x * 7.0 - time * 2.7) * 0.08;
    float v = mod(mod(sdHex(p0, 0.58), sdHex(p1, 0.58) + 0.001), (
            sin(length(p2 - vec2(-0.34, -0.49)) * 34.8 - time * 4.6) + sin(length(p2 - vec2(-0.44, 0.73)) * 20.3 - time * 8.0) + sin(length(p2 - vec2(-0.60, -0.68)) * 27.4 - time * 9.8) + sin(length(p2 - vec2(-0.32, -0.49)) * 12.9 - time * 2.6)
        ) / 4.0 + 0.001);
    v = pow(abs(v), 3.22);
    v = smoothstep(0.37, 0.67, v);
    v = step(0.83, v);
    vec3 col = pal(v + time * 0.60, vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 0.5), vec3(0.8, 0.90, 0.30));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
