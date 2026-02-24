uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy * 0.5) / min(resolution.x, resolution.y);
    float ang, v = 0.0;
    ang = atan(uv.y, uv.x) + time*2.8500 + 0.0000; v += smoothstep(0.0050, 0.0, abs(sin(ang*1)));    ang = atan(uv.y, uv.x) + time*3.4200 + 0.5236; v += smoothstep(0.0050, 0.0, abs(sin(ang*2)));    ang = atan(uv.y, uv.x) + time*3.9900 + 1.0472; v += smoothstep(0.0050, 0.0, abs(sin(ang*3)));    ang = atan(uv.y, uv.x) + time*4.5600 + 1.5708; v += smoothstep(0.0050, 0.0, abs(sin(ang*4)));    ang = atan(uv.y, uv.x) + time*5.1300 + 2.0944; v += smoothstep(0.0050, 0.0, abs(sin(ang*5)));    ang = atan(uv.y, uv.x) + time*5.7000 + 2.6180; v += smoothstep(0.0050, 0.0, abs(sin(ang*6)));
    vec3 rgb = vec3(0.05, clamp(v,0.0,1.0)*1.5, clamp(v,0.0,1.0)*0.3);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}