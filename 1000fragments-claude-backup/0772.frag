uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.6087,0.7796)) * 14.0000 - time*3.0000);    v += sin(length(st - vec2(0.1272,0.6449)) * 15.0000 - time*3.2000);    v += sin(length(st - vec2(0.3188,0.0340)) * 16.0000 - time*3.4000);    v += sin(length(st - vec2(0.7796,0.3913)) * 17.0000 - time*3.6000);
    float n = v / 4.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(0.1, n*0.6, n);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}