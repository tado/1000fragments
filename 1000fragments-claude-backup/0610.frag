uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float cx, cy, d = 10.0;
    cx = sin(time*0.5000*3.0000+2.0920); cy = cos(time*0.5000*5.0000); d = min(d, length(uv - vec2(cx,cy)*0.7000));    cx = sin(time*0.7000*3.0000+2.8770); cy = cos(time*0.7000*5.0000); d = min(d, length(uv - vec2(cx,cy)*0.6000));    cx = sin(time*0.9000*3.0000+3.6620); cy = cos(time*0.9000*5.0000); d = min(d, length(uv - vec2(cx,cy)*0.5000));
    float v = smoothstep(0.0030, 0.0, d);
    vec3 rgb = vec3(v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}