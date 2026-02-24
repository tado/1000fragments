uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float a = sin(uv.x * 60.0 + time * 4.0);
    float b = sin(uv.y * 60.0 + time * 3.5);
    float c = sin((uv.x - uv.y) * 60.0 + time * 4.5);
    float d = sin((uv.x + uv.y) * 60.0 - time * 3.0);
    float v = step(0.0, (a + b + c + d) * 0.25);
    float hue = uv.x + uv.y + time * 0.1;
    fragColor = TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5), v*(sin(hue*6.28+2.094)*0.5+0.5), v*(sin(hue*6.28+4.189)*0.5+0.5), 1.0));
}
