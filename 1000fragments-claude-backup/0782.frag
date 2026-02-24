uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.3234,0.7425)) * 19.0000 - time*1.4000);    v += sin(length(st - vec2(0.1766,0.2646)) * 20.0000 - time*1.6000);    v += sin(length(st - vec2(0.7943,0.0958)) * 21.0000 - time*1.8000);    v += sin(length(st - vec2(0.7425,0.6766)) * 22.0000 - time*2.0000);
    float n = v / 4.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(0.1, n*0.6, n);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}