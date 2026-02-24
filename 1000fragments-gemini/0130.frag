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
    { float r_0_0 = length(p0); float a_0_0 = atan(p0.y, p0.x); p0 = vec2(log(r_0_0) - time * 1.03, a_0_0 * 4.0 / PI); }
    p0 *= 1.0 + 0.90 * sin(length(p0) * 15.4 - time * 6.2);
    p0 *= rot(time * -0.23);
    vec2 p1 = uv;
    p1 = mod(p1 * 6.7 + vec2(time * -1.01), 1.0) - 0.5;
    p1.y += cos(p1.x * 9.5 - time * 4.6) * 0.23;
    vec2 p2 = uv;
    { float a_2_0 = atan(p2.y, p2.x); float r_2_0 = length(p2); a_2_0 = mod(a_2_0, TAU / 7.9) - PI / 4.4; p2 = vec2(cos(a_2_0), sin(a_2_0)) * r_2_0; }
    p2.y += cos(p2.x * 10.8 - time * 4.9) * 0.29;
    { float fov_2_2 = 0.5; vec3 p3_2_2 = vec3(p2.x, fov_2_2, p2.y - 0.41); p2 = vec2(p3_2_2.x/p3_2_2.z, p3_2_2.y/p3_2_2.z); p2.y += time * 2.2; }
    p2 *= 1.0 + 0.60 * sin(length(p2) * 12.6 - time * 7.3);
    float v = abs(mod((
            sin(length(p0 - vec2(-0.62, -0.62)) * 19.5 - time * 5.8) + sin(length(p0 - vec2(-0.16, 0.75)) * 10.0 - time * 4.9) + sin(length(p0 - vec2(0.75, 0.05)) * 13.1 - time * 4.2) + sin(length(p0 - vec2(0.00, -0.75)) * 39.6 - time * 5.1) + sin(length(p0 - vec2(-0.69, 0.26)) * 17.0 - time * 5.0)
        ) / 5.0, cellular(p1 * 9.5) + 0.001) - cellular(p2 * 9.8));
    v = smoothstep(0.02, 0.49, v);
    v = fract(v * 5.4);
    vec3 col = pal(v + time * 0.48, vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.10, 0.20));
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
