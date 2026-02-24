uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy * 0.5) / min(resolution.x, resolution.y);
    float ang, v = 0.0;
    ang = atan(uv.y, uv.x) + time*2.4000 + 0.0000; v += smoothstep(0.0200, 0.0, abs(sin(ang*1)));    ang = atan(uv.y, uv.x) + time*2.8800 + 1.0472; v += smoothstep(0.0200, 0.0, abs(sin(ang*2)));    ang = atan(uv.y, uv.x) + time*3.3600 + 2.0944; v += smoothstep(0.0200, 0.0, abs(sin(ang*3)));
    vec3 rgb = vec3(clamp(v,0.0,1.0)*2.5, clamp(v,0.0,1.0)*0.4, clamp(v,0.0,1.0)*3.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}