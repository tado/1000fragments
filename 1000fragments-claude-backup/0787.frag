uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2288,0.6282)) * 21.5000 - time*3.4000);    v += sin(length(st - vec2(0.3290,0.1384)) * 22.5000 - time*3.6000);    v += sin(length(st - vec2(0.9520,0.2863)) * 23.5000 - time*3.8000);    v += sin(length(st - vec2(0.6282,0.7712)) * 24.5000 - time*4.0000);
    float n = v / 4.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(0.05, n*1.5, n*0.3);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}