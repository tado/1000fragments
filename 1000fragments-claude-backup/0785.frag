uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2597,0.6795)) * 20.5000 - time*2.6000);    v += sin(length(st - vec2(0.8205,0.2606)) * 21.5000 - time*2.8000);
    float n = v / 2.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(1.0-n*0.9, n*0.2, n);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}