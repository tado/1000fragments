uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2173,0.6005)) * 22.0000 - time*1.0000);    v += sin(length(st - vec2(0.2561,0.1830)) * 23.0000 - time*1.2000);    v += sin(length(st - vec2(0.7827,0.0876)) * 24.0000 - time*1.4000);    v += sin(length(st - vec2(0.7878,0.5848)) * 25.0000 - time*1.6000);    v += sin(length(st - vec2(0.5110,0.8998)) * 26.0000 - time*1.8000);
    float n = v / 5.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*0.3, n*1.2, n*0.8);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}