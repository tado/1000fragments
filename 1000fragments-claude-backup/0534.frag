uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*26.8000 + time*80.0000 + cos(uv.y*24.5000+time*12.4000)*0.5);
    col.g = sin(uv.x*24.1200 - time*64.0000 + cos(uv.y*31.5000+time*15.5000)*0.75);
    col.b = sin(uv.x*21.4400 + time*40.0000 + cos(uv.y*38.5000+time*18.6000));
    vec4 color = vec4(col * 2.0000, 1.0);
    fragColor = TDOutputSwizzle(color);
}