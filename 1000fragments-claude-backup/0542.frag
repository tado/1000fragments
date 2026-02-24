uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*36.4000 + time*80.0000 + cos(uv.y*18.9000+time*18.8000)*0.5);
    col.g = sin(uv.x*32.7600 - time*64.0000 + cos(uv.y*24.3000+time*23.5000)*0.75);
    col.b = sin(uv.x*29.1200 + time*26.0000 + cos(uv.y*29.7000+time*28.2000));
    vec4 color = vec4(col * 2.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}