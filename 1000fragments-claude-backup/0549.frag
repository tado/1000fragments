uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*44.8000 + time*70.0000 + cos(uv.y*14.0000+time*22.0000)*0.5);
    col.g = sin(uv.x*40.3200 - time*56.0000 + cos(uv.y*18.0000+time*27.5000)*0.75);
    col.b = sin(uv.x*35.8400 + time*40.0000 + cos(uv.y*22.0000+time*33.0000));
    vec4 color = vec4(col * 1.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}