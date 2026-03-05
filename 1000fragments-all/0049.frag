uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy-resolution.xy*0.5)/min(resolution.x,resolution.y);
    float ang,v=0.0;
    ang=atan(uv.y,uv.x)+time*2.3000+0.0000; v+=smoothstep(0.0050,0.0,abs(sin(ang*1)));
    ang=atan(uv.y,uv.x)+time*2.7600+0.7854; v+=smoothstep(0.0050,0.0,abs(sin(ang*2)));
    ang=atan(uv.y,uv.x)+time*3.2200+1.5708; v+=smoothstep(0.0050,0.0,abs(sin(ang*3)));
    ang=atan(uv.y,uv.x)+time*3.6800+2.3562; v+=smoothstep(0.0050,0.0,abs(sin(ang*4)));
    vec3 rgb=vec3(clamp(v,0.0,1.0),0.1,1.0-clamp(v,0.0,1.0));
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}