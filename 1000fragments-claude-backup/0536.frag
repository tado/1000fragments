uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*29.2000 + time*20.0000 + cos(uv.y*23.1000+time*18.8000)*0.5);
    col.g = sin(uv.x*26.2800 - time*16.0000 + cos(uv.y*29.7000+time*23.5000)*0.75);
    col.b = sin(uv.x*23.3600 + time*19.0000 + cos(uv.y*36.3000+time*28.2000));
    vec4 color = vec4(col * 1.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}