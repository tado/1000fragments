uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 col = vec3(0.02, 0.02, 0.05);
    for(float i = 0.0; i < 50.0; i++) {
        float t = i / 50.0;
        float a = t * 6.28318 * 5.0 + time * 0.5;
        float rad = t * 0.9;
        vec2 m = vec2(cos(a) * rad, sin(a) * rad);
        float d = length(m - pos);
        float bright = 0.004 / (d * d + 0.001);
        col += bright * mix(vec3(1.0, 0.3, 0.0), vec3(0.0, 0.5, 1.0), t);
    }
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
