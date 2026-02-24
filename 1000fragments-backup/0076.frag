uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float t = time * 0.5;
    float v = mod(floor(uv.x * 20.0) + floor(uv.y * 20.0) + floor(t * 4.0), 3.0) / 2.0;
    float hue = v + t * 0.1;
    fragColor = TDOutputSwizzle(vec4(sin(hue*6.28)*0.5+0.5, sin(hue*6.28+2.094)*0.5+0.5, sin(hue*6.28+4.189)*0.5+0.5, 1.0));
}
