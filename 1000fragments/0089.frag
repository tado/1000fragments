uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float t = time;
    float s1 = sin(uv.x * 90.0 + t * 7.0);
    float s2 = sin(uv.y * 90.0 + t * 6.0);
    float s3 = sin((uv.x + uv.y) * 64.0 - t * 8.0);
    float s4 = sin((uv.x - uv.y) * 64.0 + t * 5.0);
    float moire = (s1 * s2 * s3 * s4) * 0.5 + 0.5;
    float hue = moire * 2.0 + t * 0.15;
    fragColor = TDOutputSwizzle(vec4(sin(hue*6.28)*0.5+0.5, sin(hue*6.28+2.094)*0.5+0.5, sin(hue*6.28+4.189)*0.5+0.5, 1.0));
}
