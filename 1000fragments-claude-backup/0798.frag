uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2627,0.3164)) * 27.0000 - time*2.2000);    v += sin(length(st - vec2(0.6350,0.1235)) * 28.0000 - time*2.4000);    v += sin(length(st - vec2(0.9998,0.5150)) * 29.0000 - time*2.6000);    v += sin(length(st - vec2(0.5841,0.7880)) * 30.0000 - time*2.8000);    v += sin(length(st - vec2(0.1695,0.7253)) * 31.0000 - time*3.0000);
    float n = v / 5.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*0.3, n*1.2, n*0.8);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}