uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float t = time;
    float v = 0.0;
    for(float i = 1.0; i <= 8.0; i++) {
        v += sin(uv.x * 20.0 * i + t * i) * sin(uv.y * 20.0 * i - t * i * 0.7) / i;
    }
    v = v * 0.3 + 0.5;
    float hue = v * 3.0 + t * 0.2;
    fragColor = TDOutputSwizzle(vec4(sin(hue*6.28)*0.5+0.5, sin(hue*6.28+2.094)*0.5+0.5, sin(hue*6.28+4.189)*0.5+0.5, 1.0));
}
