uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*23.2000 + time*50.0000 + cos(uv.y*26.6000+time*22.0000)*0.5);
    col.g = sin(uv.x*20.8800 - time*40.0000 + cos(uv.y*34.2000+time*27.5000)*0.75);
    col.b = sin(uv.x*18.5600 + time*19.0000 + cos(uv.y*41.8000+time*33.0000));
    vec4 color = vec4(col * 2.5000, 1.0);
    fragColor = TDOutputSwizzle(color);
}