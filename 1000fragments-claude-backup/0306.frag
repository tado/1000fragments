uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 pos;
    float t = 0.0;
    pos = vec2(sin(time*1.2800+0.0000)*0.4200, cos(time*1.1200)*0.4200); t += 0.0360 / length(pos - uv);    pos = vec2(sin(time*1.7600+0.6280)*0.4200, cos(time*1.5200)*0.4400); t += 0.0360 / length(pos - uv);    pos = vec2(sin(time*2.2400+1.2560)*0.4200, cos(time*1.9200)*0.4600); t += 0.0360 / length(pos - uv);    pos = vec2(sin(time*2.7200+1.8840)*0.4200, cos(time*2.3200)*0.4800); t += 0.0360 / length(pos - uv);    pos = vec2(sin(time*3.2000+2.5120)*0.4200, cos(time*2.7200)*0.5000); t += 0.0360 / length(pos - uv);
    vec3 rgb = clamp(1.0 - mod(vec3(t)*vec3(0.2,0.2,0.2)*0.2, 1.0), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}