uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float r = 0.0, g = 0.0, b = 0.0;
    for(float i = 0.0; i < 10.0; i++) {
        float a = time * 0.5 + i * 6.28318 / 10.0;
        float rad = 0.5 + sin(time * 1.3 + i * 0.8) * 0.3;
        vec2 m = vec2(cos(a) * rad, sin(a) * rad);
        float d = length(m - pos);
        float bright = 0.015 / (d + 0.005);
        r += bright * (sin(i * 0.628 + time * 0.5) * 0.5 + 0.5);
        g += bright * (sin(i * 0.628 + time * 0.5 + 2.1) * 0.5 + 0.5);
        b += bright * (sin(i * 0.628 + time * 0.5 + 4.2) * 0.5 + 0.5);
    }
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}
