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
    p0.x += sin(p0.y * 2.5 + time * 2.5) * 0.19;
    p0 = mod(p0 * 4.5 + vec2(time * 1.53), 1.0) - 0.5;
    { float fov_0_2 = 0.5; vec3 p3_0_2 = vec3(p0.x, fov_0_2, p0.y - -0.08); p0 = vec2(p3_0_2.x/p3_0_2.z, p3_0_2.y/p3_0_2.z); p0.y += time * 1.2; }
    p0.x += sin(p0.y * 10.3 + time * 1.8) * 0.16;
    vec2 p1 = uv;
    p1.y += cos(p1.x * 10.7 - time * 3.5) * 0.15;
    p1 = mod(p1 * 3.8 + vec2(time * 1.67), 1.0) - 0.5;
    float v = mix((
            sin(length(p0 - vec2(-0.18, 0.68)) * 36.4 - time * 6.1) + sin(length(p0 - vec2(-0.16, -0.30)) * 37.3 - time * 2.6) + sin(length(p0 - vec2(-0.12, 0.73)) * 39.0 - time * 3.6) + sin(length(p0 - vec2(0.27, -0.30)) * 31.3 - time * 8.9) + sin(length(p0 - vec2(-0.54, 0.21)) * 13.2 - time * 5.5)
        ) / 5.0, sdHex(p1, 0.41), 0.5 + 0.5 * sin(time));
    v = pow(abs(v), 3.73);
    v = abs(0.014 / (v + 0.001));
    vec3 col = pal(v + time * 0.59, vec3(0.8, 0.5, 0.4), vec3(0.2, 0.4, 0.2), vec3(2.0, 1.0, 1.0), vec3(0.0, 0.25, 0.25));
    col.r = fract(col.r + sin(uv.y * 50.0 + time) * 0.1);
    col.g = fract(col.g + cos(uv.x * 40.0 + time) * 0.1);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
