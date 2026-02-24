uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*13.6000 + time*50.0000 + cos(uv.y*32.2000+time*15.6000)*0.5);
    col.g = sin(uv.x*12.2400 - time*40.0000 + cos(uv.y*41.4000+time*19.5000)*0.75);
    col.b = sin(uv.x*10.8800 + time*33.0000 + cos(uv.y*50.6000+time*23.4000));
    vec4 color = vec4(col * 2.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}