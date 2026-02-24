uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*54.4000 + time*70.0000 + cos(uv.y*8.4000+time*9.2000)*0.5);
    col.g = sin(uv.x*48.9600 - time*56.0000 + cos(uv.y*10.8000+time*11.5000)*0.75);
    col.b = sin(uv.x*43.5200 + time*26.0000 + cos(uv.y*13.2000+time*13.8000));
    vec4 color = vec4(col * 1.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}