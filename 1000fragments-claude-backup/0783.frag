uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.3001,0.7237)) * 19.5000 - time*1.8000);    v += sin(length(st - vec2(0.1340,0.3387)) * 20.5000 - time*2.0000);    v += sin(length(st - vec2(0.5504,0.0025)) * 21.5000 - time*2.2000);    v += sin(length(st - vec2(0.7932,0.4365)) * 22.5000 - time*2.4000);    v += sin(length(st - vec2(0.7013,0.8456)) * 23.5000 - time*2.6000);
    float n = v / 5.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(abs(sin(n*3.14159)), abs(sin(n*3.14159+2.094)), abs(sin(n*3.14159+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}