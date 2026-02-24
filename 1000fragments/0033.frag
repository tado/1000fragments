uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 col = vec3(0.0);
    for(float i = 0.0; i < 25.0; i++) {
        float t = time * 0.2 + i * 0.4;
        vec2 m = vec2(sin(t * 1.1) * cos(t * 0.7), sin(t * 0.9) * cos(t * 1.3)) * 0.8;
        float d = length(m - pos);
        float size = 0.01 + sin(i * 0.7 + time) * 0.005;
        col += vec3(size / (d + 0.003)) *
               vec3(sin(i*0.5)*0.5+0.5, sin(i*0.5+2.1)*0.5+0.5, sin(i*0.5+4.2)*0.5+0.5);
    }
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
