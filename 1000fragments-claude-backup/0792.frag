uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2005,0.4825)) * 24.0000 - time*2.6000);    v += sin(length(st - vec2(0.5233,0.1007)) * 25.0000 - time*2.8000);    v += sin(length(st - vec2(0.9991,0.5292)) * 26.0000 - time*3.0000);    v += sin(length(st - vec2(0.4825,0.7995)) * 27.0000 - time*3.2000);
    float n = v / 4.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(0.1, n*0.6, n);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}