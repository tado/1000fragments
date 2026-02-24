uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2456,0.3410)) * 26.5000 - time*1.8000);    v += sin(length(st - vec2(0.7119,0.1608)) * 27.5000 - time*2.0000);    v += sin(length(st - vec2(0.9241,0.7649)) * 28.5000 - time*2.2000);    v += sin(length(st - vec2(0.3410,0.7544)) * 29.5000 - time*2.4000);
    float n = v / 4.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(0.05, n*1.5, n*0.3);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}