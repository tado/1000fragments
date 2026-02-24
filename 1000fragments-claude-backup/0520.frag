uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*10.0000 + time*20.0000 + cos(uv.y*34.3000+time*6.0000)*0.5);
    col.g = sin(uv.x*9.0000 - time*16.0000 + cos(uv.y*44.1000+time*7.5000)*0.75);
    col.b = sin(uv.x*8.0000 + time*12.0000 + cos(uv.y*53.9000+time*9.0000));
    vec4 color = vec4(col * 1.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}