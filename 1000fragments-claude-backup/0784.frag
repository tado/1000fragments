uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2788,0.7026)) * 20.0000 - time*2.2000);    v += sin(length(st - vec2(0.1185,0.3797)) * 21.0000 - time*2.4000);    v += sin(length(st - vec2(0.3919,0.0118)) * 22.0000 - time*2.6000);    v += sin(length(st - vec2(0.7212,0.2974)) * 23.0000 - time*2.8000);    v += sin(length(st - vec2(0.8815,0.6203)) * 24.0000 - time*3.0000);    v += sin(length(st - vec2(0.6081,0.9882)) * 25.0000 - time*3.2000);
    float n = v / 6.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*2.5, n*0.4, n*3.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}