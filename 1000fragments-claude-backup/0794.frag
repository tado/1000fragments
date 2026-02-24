uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2100,0.4233)) * 25.0000 - time*3.4000);    v += sin(length(st - vec2(0.3952,0.1140)) * 26.0000 - time*3.6000);    v += sin(length(st - vec2(0.8524,0.1452)) * 27.0000 - time*3.8000);    v += sin(length(st - vec2(0.7900,0.5767)) * 28.0000 - time*4.0000);    v += sin(length(st - vec2(0.6048,0.8860)) * 29.0000 - time*4.2000);    v += sin(length(st - vec2(0.1476,0.8548)) * 30.0000 - time*4.4000);
    float n = v / 6.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*2.5, n*0.4, n*3.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}