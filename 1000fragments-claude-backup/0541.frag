uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*35.2000 + time*70.0000 + cos(uv.y*19.6000+time*15.6000)*0.5);
    col.g = sin(uv.x*31.6800 - time*56.0000 + cos(uv.y*25.2000+time*19.5000)*0.75);
    col.b = sin(uv.x*28.1600 + time*19.0000 + cos(uv.y*30.8000+time*23.4000));
    vec4 color = vec4(col * 1.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}