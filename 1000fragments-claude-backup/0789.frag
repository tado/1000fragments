uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2087,0.5718)) * 22.5000 - time*1.4000);    v += sin(length(st - vec2(0.2229,0.2115)) * 23.5000 - time*1.6000);    v += sin(length(st - vec2(0.6391,0.0198)) * 24.5000 - time*1.8000);    v += sin(length(st - vec2(0.7913,0.4282)) * 25.5000 - time*2.0000);    v += sin(length(st - vec2(0.7771,0.7885)) * 26.5000 - time*2.2000);    v += sin(length(st - vec2(0.3609,0.9802)) * 27.5000 - time*2.4000);
    float n = v / 6.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n, n*0.1, 1.0-n);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}