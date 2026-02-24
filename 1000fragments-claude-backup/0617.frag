uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float cx, cy, d = 10.0;
    cx = sin(time*0.5000*2.0000+2.6150); cy = cos(time*0.5000*4.0000); d = min(d, length(uv - vec2(cx,cy)*0.7000));    cx = sin(time*0.7000*2.0000+3.4000); cy = cos(time*0.7000*4.0000); d = min(d, length(uv - vec2(cx,cy)*0.6000));
    float v = smoothstep(0.0090, 0.0, d);
    vec3 rgb = vec3(0.05, v*1.5, v*0.3);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}