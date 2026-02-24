uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*37.6000 + time*90.0000 + cos(uv.y*18.2000+time*22.0000)*0.5);
    col.g = sin(uv.x*33.8400 - time*72.0000 + cos(uv.y*23.4000+time*27.5000)*0.75);
    col.b = sin(uv.x*30.0800 + time*33.0000 + cos(uv.y*28.6000+time*33.0000));
    vec4 color = vec4(col * 2.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}