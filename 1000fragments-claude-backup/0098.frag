uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy * 0.5) / min(resolution.x, resolution.y);
    float ang, v = 0.0;
    ang = atan(uv.y, uv.x) + time*3.0000 + 0.0000; v += smoothstep(0.0080, 0.0, abs(sin(ang*1)));
    vec3 rgb = vec3(clamp(v,0.0,1.0)*0.3, clamp(v,0.0,1.0)*1.2, clamp(v,0.0,1.0)*0.8);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}