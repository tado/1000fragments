uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.7090,0.7152)) * 12.0000 - time*1.4000);    v += sin(length(st - vec2(0.3132,0.8537)) * 13.0000 - time*1.6000);    v += sin(length(st - vec2(0.0074,0.4146)) * 14.0000 - time*1.8000);    v += sin(length(st - vec2(0.4574,0.2030)) * 15.0000 - time*2.0000);    v += sin(length(st - vec2(0.8590,0.3236)) * 16.0000 - time*2.2000);
    float n = v / 5.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*0.3, n*1.2, n*0.8);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}