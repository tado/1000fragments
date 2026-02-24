uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*32.8000 + time*50.0000 + cos(uv.y*21.0000+time*9.2000)*0.5);
    col.g = sin(uv.x*29.5200 - time*40.0000 + cos(uv.y*27.0000+time*11.5000)*0.75);
    col.b = sin(uv.x*26.2400 + time*40.0000 + cos(uv.y*33.0000+time*13.8000));
    vec4 color = vec4(col * 2.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}