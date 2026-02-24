uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*50.8000 + time*40.0000 + cos(uv.y*10.5000+time*18.8000)*0.5);
    col.g = sin(uv.x*45.7200 - time*32.0000 + cos(uv.y*13.5000+time*23.5000)*0.75);
    col.b = sin(uv.x*40.6400 + time*40.0000 + cos(uv.y*16.5000+time*28.2000));
    vec4 color = vec4(col * 2.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}