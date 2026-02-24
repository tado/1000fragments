uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*30.4000 + time*30.0000 + cos(uv.y*22.4000+time*22.0000)*0.5);
    col.g = sin(uv.x*27.3600 - time*24.0000 + cos(uv.y*28.8000+time*27.5000)*0.75);
    col.b = sin(uv.x*24.3200 + time*26.0000 + cos(uv.y*35.2000+time*33.0000));
    vec4 color = vec4(col * 1.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}