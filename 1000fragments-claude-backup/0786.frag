uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2429,0.6547)) * 21.0000 - time*3.0000);    v += sin(length(st - vec2(0.4928,0.1001)) * 22.0000 - time*3.2000);    v += sin(length(st - vec2(0.9374,0.7422)) * 23.0000 - time*3.4000);
    float n = v / 3.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*1.8, n*0.7, 0.1);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}