uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.3485,0.7590)) * 18.5000 - time*1.0000);    v += sin(length(st - vec2(0.3019,0.1525)) * 19.5000 - time*1.2000);    v += sin(length(st - vec2(1.0000,0.5028)) * 20.5000 - time*1.4000);
    float n = v / 3.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n, n*0.5, 0.15);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}