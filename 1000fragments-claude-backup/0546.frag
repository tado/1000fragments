uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*41.2000 + time*40.0000 + cos(uv.y*16.1000+time*12.4000)*0.5);
    col.g = sin(uv.x*37.0800 - time*32.0000 + cos(uv.y*20.7000+time*15.5000)*0.75);
    col.b = sin(uv.x*32.9600 + time*19.0000 + cos(uv.y*25.3000+time*18.6000));
    vec4 color = vec4(col * 2.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}