uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy * 0.5) / min(resolution.x, resolution.y);
    float ang, v = 0.0;
    ang = atan(uv.y, uv.x) + time*2.1000 + 0.0000; v += smoothstep(0.0140, 0.0, abs(sin(ang*1)));
    vec3 rgb = vec3(0.1, clamp(v,0.0,1.0)*0.6, clamp(v,0.0,1.0));
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}