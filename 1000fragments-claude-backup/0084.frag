uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy * 0.5) / min(resolution.x, resolution.y);
    float ang, v = 0.0;
    ang = atan(uv.y, uv.x) + time*0.9000 + 0.0000; v += smoothstep(0.0140, 0.0, abs(sin(ang*1)));    ang = atan(uv.y, uv.x) + time*1.0800 + 0.6283; v += smoothstep(0.0140, 0.0, abs(sin(ang*2)));    ang = atan(uv.y, uv.x) + time*1.2600 + 1.2566; v += smoothstep(0.0140, 0.0, abs(sin(ang*3)));    ang = atan(uv.y, uv.x) + time*1.4400 + 1.8850; v += smoothstep(0.0140, 0.0, abs(sin(ang*4)));    ang = atan(uv.y, uv.x) + time*1.6200 + 2.5133; v += smoothstep(0.0140, 0.0, abs(sin(ang*5)));
    vec3 rgb = vec3(clamp(v,0.0,1.0)*2.5, clamp(v,0.0,1.0)*0.4, clamp(v,0.0,1.0)*3.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}