uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 pos;
    float t = 0.0;
    pos = vec2(sin(time*0.9600+0.0000)*0.3000, cos(time*0.8400)*0.3000); t += 0.0280 / length(pos - uv);    pos = vec2(sin(time*1.3200+0.6280)*0.3000, cos(time*1.1400)*0.3200); t += 0.0280 / length(pos - uv);    pos = vec2(sin(time*1.6800+1.2560)*0.3000, cos(time*1.4400)*0.3400); t += 0.0280 / length(pos - uv);    pos = vec2(sin(time*2.0400+1.8840)*0.3000, cos(time*1.7400)*0.3600); t += 0.0280 / length(pos - uv);
    vec3 rgb = clamp(vec3(abs(sin(t*0.3)), abs(sin(t*0.2+1.0)), abs(sin(t*0.25+2.0))), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}