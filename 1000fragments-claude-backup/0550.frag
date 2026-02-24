uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*46.0000 + time*80.0000 + cos(uv.y*13.3000+time*6.0000)*0.5);
    col.g = sin(uv.x*41.4000 - time*64.0000 + cos(uv.y*17.1000+time*7.5000)*0.75);
    col.b = sin(uv.x*36.8000 + time*12.0000 + cos(uv.y*20.9000+time*9.0000));
    vec4 color = vec4(col * 2.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}