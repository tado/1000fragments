uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2822,0.2937)) * 27.5000 - time*2.6000);    v += sin(length(st - vec2(0.5931,0.1110)) * 28.5000 - time*2.8000);    v += sin(length(st - vec2(0.9793,0.3576)) * 29.5000 - time*3.0000);    v += sin(length(st - vec2(0.7178,0.7063)) * 30.5000 - time*3.2000);    v += sin(length(st - vec2(0.4069,0.8890)) * 31.5000 - time*3.4000);    v += sin(length(st - vec2(0.0207,0.6424)) * 32.5000 - time*3.6000);
    float n = v / 6.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n, n*0.1, 1.0-n);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}