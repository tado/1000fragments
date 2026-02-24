uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.7940,0.5596)) * 9.0000 - time*1.8000);    v += sin(length(st - vec2(0.4205,0.8920)) * 10.0000 - time*2.0000);    v += sin(length(st - vec2(0.0100,0.4007)) * 11.0000 - time*2.2000);    v += sin(length(st - vec2(0.5596,0.2060)) * 12.0000 - time*2.4000);
    float n = v / 4.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(0.1, n*0.6, n);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}