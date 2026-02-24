uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*43.6000 + time*60.0000 + cos(uv.y*14.7000+time*18.8000)*0.5);
    col.g = sin(uv.x*39.2400 - time*48.0000 + cos(uv.y*18.9000+time*23.5000)*0.75);
    col.b = sin(uv.x*34.8800 + time*33.0000 + cos(uv.y*23.1000+time*28.2000));
    vec4 color = vec4(col * 1.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}