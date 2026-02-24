uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*12.4000 + time*40.0000 + cos(uv.y*32.9000+time*12.4000)*0.5);
    col.g = sin(uv.x*11.1600 - time*32.0000 + cos(uv.y*42.3000+time*15.5000)*0.75);
    col.b = sin(uv.x*9.9200 + time*26.0000 + cos(uv.y*51.7000+time*18.6000));
    vec4 color = vec4(col * 2.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}