uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*19.6000 + time*20.0000 + cos(uv.y*28.7000+time*12.4000)*0.5);
    col.g = sin(uv.x*17.6400 - time*16.0000 + cos(uv.y*36.9000+time*15.5000)*0.75);
    col.b = sin(uv.x*15.6800 + time*33.0000 + cos(uv.y*45.1000+time*18.6000));
    vec4 color = vec4(col * 1.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}