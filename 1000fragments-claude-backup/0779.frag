uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.4030,0.7839)) * 17.5000 - time*3.0000);    v += sin(length(st - vec2(0.1075,0.5773)) * 18.5000 - time*3.2000);    v += sin(length(st - vec2(0.1711,0.1234)) * 19.5000 - time*3.4000);    v += sin(length(st - vec2(0.5970,0.2161)) * 20.5000 - time*3.6000);    v += sin(length(st - vec2(0.8925,0.4227)) * 21.5000 - time*3.8000);    v += sin(length(st - vec2(0.8289,0.8766)) * 22.5000 - time*4.0000);
    float n = v / 6.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n, n*0.1, 1.0-n);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}