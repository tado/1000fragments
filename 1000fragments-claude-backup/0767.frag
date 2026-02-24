uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.7295,0.6933)) * 11.5000 - time*1.0000);    v += sin(length(st - vec2(0.2423,0.8059)) * 12.5000 - time*1.2000);    v += sin(length(st - vec2(0.1176,0.1779)) * 13.5000 - time*1.4000);    v += sin(length(st - vec2(0.6933,0.2705)) * 14.5000 - time*1.6000);
    float n = v / 4.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(0.05, n*1.5, n*0.3);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}