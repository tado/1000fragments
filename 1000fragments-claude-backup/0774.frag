uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.5510,0.7956)) * 15.0000 - time*1.0000);    v += sin(length(st - vec2(0.1926,0.7560)) * 16.0000 - time*1.2000);    v += sin(length(st - vec2(0.0308,0.3272)) * 17.0000 - time*1.4000);    v += sin(length(st - vec2(0.4490,0.2044)) * 18.0000 - time*1.6000);    v += sin(length(st - vec2(0.8074,0.2440)) * 19.0000 - time*1.8000);    v += sin(length(st - vec2(0.9692,0.6728)) * 20.0000 - time*2.0000);
    float n = v / 6.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*2.5, n*0.4, n*3.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}