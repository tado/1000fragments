uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

#define PI 3.14159265359

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), f.x),
               mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x), f.y);
}

float sdBox( vec2 p, vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdCircle( vec2 p, float r ) {
    return length(p) - r;
}
void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
    
    uv *= rot(length(uv) + time);
    
    vec2 g = mod(uv * 19.06, 1.0) - 0.5; float d = length(g); d = smoothstep(0.11, 0.11 + 0.02, d);
    
    vec3 col = mix(vec3(0.1, 0.5, 0.8), vec3(0.9, 0.2, 0.3), d);
    
    vec4 finalColor = vec4(col, 1.0);
    fragColor = TDOutputSwizzle(finalColor);
}
