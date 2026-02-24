uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy * 0.5) / min(resolution.x, resolution.y);
    float ang, v = 0.0;
    ang = atan(uv.y, uv.x) + time*1.9500 + 0.0000; v += smoothstep(0.0110, 0.0, abs(sin(ang*1)));    ang = atan(uv.y, uv.x) + time*2.3400 + 0.5236; v += smoothstep(0.0110, 0.0, abs(sin(ang*2)));    ang = atan(uv.y, uv.x) + time*2.7300 + 1.0472; v += smoothstep(0.0110, 0.0, abs(sin(ang*3)));    ang = atan(uv.y, uv.x) + time*3.1200 + 1.5708; v += smoothstep(0.0110, 0.0, abs(sin(ang*4)));    ang = atan(uv.y, uv.x) + time*3.5100 + 2.0944; v += smoothstep(0.0110, 0.0, abs(sin(ang*5)));    ang = atan(uv.y, uv.x) + time*3.9000 + 2.6180; v += smoothstep(0.0110, 0.0, abs(sin(ang*6)));
    vec3 rgb = vec3(clamp(v,0.0,1.0), clamp(v,0.0,1.0)*0.5, 0.15);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}