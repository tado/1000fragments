uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*49.6000 + time*30.0000 + cos(uv.y*11.2000+time*15.6000)*0.5);
    col.g = sin(uv.x*44.6400 - time*24.0000 + cos(uv.y*14.4000+time*19.5000)*0.75);
    col.b = sin(uv.x*39.6800 + time*33.0000 + cos(uv.y*17.6000+time*23.4000));
    vec4 color = vec4(col * 1.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}