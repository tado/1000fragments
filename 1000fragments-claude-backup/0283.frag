uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 pos;
    float t = 0.0;
    pos = vec2(sin(time*1.6000+0.0000)*0.6600, cos(time*1.4000)*0.6600); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*2.2000+0.6280)*0.6600, cos(time*1.9000)*0.6800); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*2.8000+1.2560)*0.6600, cos(time*2.4000)*0.7000); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*3.4000+1.8840)*0.6600, cos(time*2.9000)*0.7200); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*4.0000+2.5120)*0.6600, cos(time*3.4000)*0.7400); t += 0.0440 / length(pos - uv);    pos = vec2(sin(time*4.6000+3.1400)*0.6600, cos(time*3.9000)*0.7600); t += 0.0440 / length(pos - uv);
    vec3 rgb = clamp(1.0 - mod(vec3(t)*vec3(0.2,0.2,0.2)*0.2, 1.0), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}