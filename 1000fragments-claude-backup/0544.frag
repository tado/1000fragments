uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*38.8000 + time*20.0000 + cos(uv.y*17.5000+time*6.0000)*0.5);
    col.g = sin(uv.x*34.9200 - time*16.0000 + cos(uv.y*22.5000+time*7.5000)*0.75);
    col.b = sin(uv.x*31.0400 + time*40.0000 + cos(uv.y*27.5000+time*9.0000));
    vec4 color = vec4(col * 1.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}