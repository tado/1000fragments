uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float cx, cy, d = 10.0;
    cx = sin(time*0.5000*4.0000+2.6150); cy = cos(time*0.5000*6.0000); d = min(d, length(uv - vec2(cx,cy)*0.7000));    cx = sin(time*0.7000*4.0000+3.4000); cy = cos(time*0.7000*6.0000); d = min(d, length(uv - vec2(cx,cy)*0.6000));    cx = sin(time*0.9000*4.0000+4.1850); cy = cos(time*0.9000*6.0000); d = min(d, length(uv - vec2(cx,cy)*0.5000));    cx = sin(time*1.1000*4.0000+4.9700); cy = cos(time*1.1000*6.0000); d = min(d, length(uv - vec2(cx,cy)*0.4000));
    float v = smoothstep(0.0060, 0.0, d);
    vec3 rgb = vec3(v, v*0.5, 0.15);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}