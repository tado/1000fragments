uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*42.4000 + time*50.0000 + cos(uv.y*15.4000+time*15.6000)*0.5);
    col.g = sin(uv.x*38.1600 - time*40.0000 + cos(uv.y*19.8000+time*19.5000)*0.75);
    col.b = sin(uv.x*33.9200 + time*26.0000 + cos(uv.y*24.2000+time*23.4000));
    vec4 color = vec4(col * 2.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}