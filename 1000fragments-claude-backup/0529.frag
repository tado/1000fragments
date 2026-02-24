uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*20.8000 + time*30.0000 + cos(uv.y*28.0000+time*15.6000)*0.5);
    col.g = sin(uv.x*18.7200 - time*24.0000 + cos(uv.y*36.0000+time*19.5000)*0.75);
    col.b = sin(uv.x*16.6400 + time*40.0000 + cos(uv.y*44.0000+time*23.4000));
    vec4 color = vec4(col * 1.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}