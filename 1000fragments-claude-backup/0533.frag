uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*25.6000 + time*70.0000 + cos(uv.y*25.2000+time*9.2000)*0.5);
    col.g = sin(uv.x*23.0400 - time*56.0000 + cos(uv.y*32.4000+time*11.5000)*0.75);
    col.b = sin(uv.x*20.4800 + time*33.0000 + cos(uv.y*39.6000+time*13.8000));
    vec4 color = vec4(col * 1.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}