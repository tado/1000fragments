uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.5802,0.7891)) * 14.5000 - time*3.4000);    v += sin(length(st - vec2(0.1665,0.7209)) * 15.5000 - time*3.6000);    v += sin(length(st - vec2(0.1086,0.1888)) * 16.5000 - time*3.8000);    v += sin(length(st - vec2(0.6050,0.2190)) * 17.5000 - time*4.0000);    v += sin(length(st - vec2(0.8996,0.5173)) * 18.5000 - time*4.2000);
    float n = v / 5.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(abs(sin(n*3.14159)), abs(sin(n*3.14159+2.094)), abs(sin(n*3.14159+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}