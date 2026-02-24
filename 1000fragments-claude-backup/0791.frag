uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2003,0.5125)) * 23.5000 - time*2.2000);    v += sin(length(st - vec2(0.6854,0.1456)) * 24.5000 - time*2.4000);    v += sin(length(st - vec2(0.7678,0.9222)) * 25.5000 - time*2.6000);
    float n = v / 3.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n, n*0.5, 0.15);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}