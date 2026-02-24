uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float angle = time * 0.3;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 ruv = rot * (uv - 0.5);
    vec2 g = fract(ruv * 12.0) - 0.5;
    float d = length(g);
    float v = 1.0 - smoothstep(0.1, 0.5, d);
    float hue = atan(g.y, g.x) / 6.28318 + time * 0.2;
    fragColor = TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5), v*(sin(hue*6.28+2.094)*0.5+0.5), v*(sin(hue*6.28+4.189)*0.5+0.5), 1.0));
}
