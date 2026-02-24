uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*31.6000 + time*40.0000 + cos(uv.y*21.7000+time*6.0000)*0.5);
    col.g = sin(uv.x*28.4400 - time*32.0000 + cos(uv.y*27.9000+time*7.5000)*0.75);
    col.b = sin(uv.x*25.2800 + time*33.0000 + cos(uv.y*34.1000+time*9.0000));
    vec4 color = vec4(col * 2.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}