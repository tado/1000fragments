uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.2038,0.4527)) * 24.5000 - time*3.0000);    v += sin(length(st - vec2(0.4380,0.1048)) * 25.5000 - time*3.2000);    v += sin(length(st - vec2(0.9458,0.2736)) * 26.5000 - time*3.4000);    v += sin(length(st - vec2(0.7119,0.7124)) * 27.5000 - time*3.6000);    v += sin(length(st - vec2(0.3179,0.8562)) * 28.5000 - time*3.8000);
    float n = v / 5.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(abs(sin(n*3.14159)), abs(sin(n*3.14159+2.094)), abs(sin(n*3.14159+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}