uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*53.2000 + time*60.0000 + cos(uv.y*9.1000+time*6.0000)*0.5);
    col.g = sin(uv.x*47.8800 - time*48.0000 + cos(uv.y*11.7000+time*7.5000)*0.75);
    col.b = sin(uv.x*42.5600 + time*19.0000 + cos(uv.y*14.3000+time*9.0000));
    vec4 color = vec4(col * 1.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}