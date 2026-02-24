uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2310,0.3672)) * 26.0000 - time*1.4000);    v += sin(length(st - vec2(0.8326,0.2779)) * 27.0000 - time*1.6000);    v += sin(length(st - vec2(0.5326,0.9989)) * 28.0000 - time*1.8000);
    float n = v / 3.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*1.8, n*0.7, 0.1);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}