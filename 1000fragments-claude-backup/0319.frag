uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 pos;
    float t = 0.0;
    pos = vec2(sin(time*1.6000+0.0000)*0.7800, cos(time*1.4000)*0.7800); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*2.2000+0.6280)*0.7800, cos(time*1.9000)*0.8000); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*2.8000+1.2560)*0.7800, cos(time*2.4000)*0.8200); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*3.4000+1.8840)*0.7800, cos(time*2.9000)*0.8400); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*4.0000+2.5120)*0.7800, cos(time*3.4000)*0.8600); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*4.6000+3.1400)*0.7800, cos(time*3.9000)*0.8800); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*5.2000+3.7680)*0.7800, cos(time*4.4000)*0.9000); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*5.8000+4.3960)*0.7800, cos(time*4.9000)*0.9200); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*6.4000+5.0240)*0.7800, cos(time*5.4000)*0.9400); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*7.0000+5.6520)*0.7800, cos(time*5.9000)*0.9600); t += 0.0440 / length(pos - uv);
    vec3 rgb = clamp(1.0 - mod(vec3(t)*vec3(0.2,0.2,0.2)*0.2, 1.0), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}