uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.4613,0.7975)) * 16.5000 - time*2.2000);    v += sin(length(st - vec2(0.1033,0.4485)) * 17.5000 - time*2.4000);    v += sin(length(st - vec2(0.5644,0.0042)) * 18.5000 - time*2.6000);    v += sin(length(st - vec2(0.7975,0.5387)) * 19.5000 - time*2.8000);
    float n = v / 4.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(0.05, n*1.5, n*0.3);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}