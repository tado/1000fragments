uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy * 0.5) / min(resolution.x, resolution.y);
    float ang, v = 0.0;
    ang = atan(uv.y, uv.x) + time*5.5500 + 0.0000; v += smoothstep(0.0110, 0.0, abs(sin(ang*1)));    ang = atan(uv.y, uv.x) + time*6.6600 + 0.5236; v += smoothstep(0.0110, 0.0, abs(sin(ang*2)));    ang = atan(uv.y, uv.x) + time*7.7700 + 1.0472; v += smoothstep(0.0110, 0.0, abs(sin(ang*3)));    ang = atan(uv.y, uv.x) + time*8.8800 + 1.5708; v += smoothstep(0.0110, 0.0, abs(sin(ang*4)));    ang = atan(uv.y, uv.x) + time*9.9900 + 2.0944; v += smoothstep(0.0110, 0.0, abs(sin(ang*5)));    ang = atan(uv.y, uv.x) + time*11.1000 + 2.6180; v += smoothstep(0.0110, 0.0, abs(sin(ang*6)));
    vec3 rgb = vec3(1.0-clamp(v,0.0,1.0)*0.9, clamp(v,0.0,1.0)*0.2, clamp(v,0.0,1.0));
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}