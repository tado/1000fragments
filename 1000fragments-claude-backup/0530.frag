uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*22.0000 + time*40.0000 + cos(uv.y*27.3000+time*18.8000)*0.5);
    col.g = sin(uv.x*19.8000 - time*32.0000 + cos(uv.y*35.1000+time*23.5000)*0.75);
    col.b = sin(uv.x*17.6000 + time*12.0000 + cos(uv.y*42.9000+time*28.2000));
    vec4 color = vec4(col * 2.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}