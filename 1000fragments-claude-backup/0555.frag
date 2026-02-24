uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*52.0000 + time*50.0000 + cos(uv.y*9.8000+time*22.0000)*0.5);
    col.g = sin(uv.x*46.8000 - time*40.0000 + cos(uv.y*12.6000+time*27.5000)*0.75);
    col.b = sin(uv.x*41.6000 + time*12.0000 + cos(uv.y*15.4000+time*33.0000));
    vec4 color = vec4(col * 2.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}