uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.4912,0.7999)) * 16.0000 - time*1.8000);    v += sin(length(st - vec2(0.1596,0.2900)) * 17.0000 - time*2.0000);    v += sin(length(st - vec2(0.9401,0.2628)) * 18.0000 - time*2.2000);
    float n = v / 3.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*1.8, n*0.7, 0.1);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}