uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*14.8000 + time*60.0000 + cos(uv.y*31.5000+time*18.8000)*0.5);
    col.g = sin(uv.x*13.3200 - time*48.0000 + cos(uv.y*40.5000+time*23.5000)*0.75);
    col.b = sin(uv.x*11.8400 + time*40.0000 + cos(uv.y*49.5000+time*28.2000));
    vec4 color = vec4(col * 1.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}