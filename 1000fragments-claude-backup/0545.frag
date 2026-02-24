uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*40.0000 + time*30.0000 + cos(uv.y*16.8000+time*9.2000)*0.5);
    col.g = sin(uv.x*36.0000 - time*24.0000 + cos(uv.y*21.6000+time*11.5000)*0.75);
    col.b = sin(uv.x*32.0000 + time*12.0000 + cos(uv.y*26.4000+time*13.8000));
    vec4 color = vec4(col * 1.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}