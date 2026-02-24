uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 pos;
    float t = 0.0;
    pos = vec2(sin(time*0.9600+0.0000)*0.5400, cos(time*0.8400)*0.5400); t += 0.0280 / length(pos - uv);    pos = vec2(sin(time*1.3200+0.6280)*0.5400, cos(time*1.1400)*0.5600); t += 0.0280 / length(pos - uv);    pos = vec2(sin(time*1.6800+1.2560)*0.5400, cos(time*1.4400)*0.5800); t += 0.0280 / length(pos - uv);    pos = vec2(sin(time*2.0400+1.8840)*0.5400, cos(time*1.7400)*0.6000); t += 0.0280 / length(pos - uv);    pos = vec2(sin(time*2.4000+2.5120)*0.5400, cos(time*2.0400)*0.6200); t += 0.0280 / length(pos - uv);    pos = vec2(sin(time*2.7600+3.1400)*0.5400, cos(time*2.3400)*0.6400); t += 0.0280 / length(pos - uv);    pos = vec2(sin(time*3.1200+3.7680)*0.5400, cos(time*2.6400)*0.6600); t += 0.0280 / length(pos - uv);    pos = vec2(sin(time*3.4800+4.3960)*0.5400, cos(time*2.9400)*0.6800); t += 0.0280 / length(pos - uv);
    vec3 rgb = clamp(vec3(t*0.08, t*0.03, t*0.12), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}