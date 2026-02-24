uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.6865,0.7350)) * 12.5000 - time*1.8000);    v += sin(length(st - vec2(0.3530,0.8720)) * 13.5000 - time*2.0000);    v += sin(length(st - vec2(0.0054,0.5733)) * 14.5000 - time*2.2000);    v += sin(length(st - vec2(0.3135,0.2650)) * 15.5000 - time*2.4000);    v += sin(length(st - vec2(0.6470,0.1280)) * 16.5000 - time*2.6000);    v += sin(length(st - vec2(0.9946,0.4267)) * 17.5000 - time*2.8000);
    float n = v / 6.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n, n*0.1, 1.0-n);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}