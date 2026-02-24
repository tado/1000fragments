uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*18.4000 + time*90.0000 + cos(uv.y*29.4000+time*9.2000)*0.5);
    col.g = sin(uv.x*16.5600 - time*72.0000 + cos(uv.y*37.8000+time*11.5000)*0.75);
    col.b = sin(uv.x*14.7200 + time*26.0000 + cos(uv.y*46.2000+time*13.8000));
    vec4 color = vec4(col * 2.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}