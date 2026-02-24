uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = gl_FragCoord.xy / resolution.xy - 0.5;
    pos.x *= resolution.x / resolution.y;
    float z = 0.4;
    vec2 s = vec2(pos.x / (pos.y + z), z / (abs(pos.y) + z));
    s.x += time * 0.5;
    float pattern = sign((mod(s.x, 0.2) - 0.1) * (mod(s.y * 5.0, 0.2) - 0.1));
    pattern *= s.y * s.y * 20.0;
    float hue = s.x * 0.5 + time * 0.2;
    fragColor = TDOutputSwizzle(vec4(
        pattern*(sin(hue*6.28)*0.5+0.5),
        pattern*(sin(hue*6.28+2.094)*0.5+0.5),
        pattern*(sin(hue*6.28+4.189)*0.5+0.5), 1.0));
}
