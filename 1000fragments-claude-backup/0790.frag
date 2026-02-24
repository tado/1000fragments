uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2030,0.5423)) * 23.0000 - time*1.8000);    v += sin(length(st - vec2(0.8960,0.4436)) * 24.0000 - time*2.0000);
    float n = v / 2.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}