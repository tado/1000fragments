uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*28.0000 + time*90.0000 + cos(uv.y*23.8000+time*15.6000)*0.5);
    col.g = sin(uv.x*25.2000 - time*72.0000 + cos(uv.y*30.6000+time*19.5000)*0.75);
    col.b = sin(uv.x*22.4000 + time*12.0000 + cos(uv.y*37.4000+time*23.4000));
    vec4 color = vec4(col * 2.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}