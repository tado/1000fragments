uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*34.0000 + time*60.0000 + cos(uv.y*20.3000+time*12.4000)*0.5);
    col.g = sin(uv.x*30.6000 - time*48.0000 + cos(uv.y*26.1000+time*15.5000)*0.75);
    col.b = sin(uv.x*27.2000 + time*12.0000 + cos(uv.y*31.9000+time*18.6000));
    vec4 color = vec4(col * 1.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}