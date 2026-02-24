uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float angle = atan(uv.y, uv.x);
    float r = length(uv);
    float spiral = mod(angle / 6.28318 + r * 3.0 - time * 0.3, 1.0);
    float stripe = step(0.5, spiral);
    float fade = exp(-r * 2.0);
    float hue = r * 2.0 + time * 0.2;
    fragColor = TDOutputSwizzle(vec4(
        stripe * fade * (sin(hue) * 0.5 + 0.5),
        stripe * fade * (sin(hue + 2.094) * 0.5 + 0.5),
        stripe * fade * (sin(hue + 4.189) * 0.5 + 0.5), 1.0));
}
