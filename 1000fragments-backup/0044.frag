uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float angle = atan(uv.y, uv.x) + time * 0.5;
    float r = length(uv);
    float petals = sin(angle * 6.0) * 0.3 + 0.3;
    float mask = step(r, petals);
    float inner = step(r, petals * 0.5);
    float hue = time * 0.3 + r;
    vec3 col = vec3(sin(hue)*0.5+0.5, sin(hue+2.094)*0.5+0.5, sin(hue+4.189)*0.5+0.5);
    col = mix(vec3(0.0), col, mask);
    col = mix(col, 1.0 - col, inner);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
