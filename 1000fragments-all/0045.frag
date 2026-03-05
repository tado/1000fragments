uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy-resolution.xy*0.5)/min(resolution.x,resolution.y);
    float ang,v=0.0;
    ang=atan(uv.y,uv.x)+time*1.5000+0.0000; v+=smoothstep(0.0170,0.0,abs(sin(ang*1)));
    ang=atan(uv.y,uv.x)+time*1.8000+0.5236; v+=smoothstep(0.0170,0.0,abs(sin(ang*2)));
    ang=atan(uv.y,uv.x)+time*2.1000+1.0472; v+=smoothstep(0.0170,0.0,abs(sin(ang*3)));
    ang=atan(uv.y,uv.x)+time*2.4000+1.5708; v+=smoothstep(0.0170,0.0,abs(sin(ang*4)));
    ang=atan(uv.y,uv.x)+time*2.7000+2.0944; v+=smoothstep(0.0170,0.0,abs(sin(ang*5)));
    ang=atan(uv.y,uv.x)+time*3.0000+2.6180; v+=smoothstep(0.0170,0.0,abs(sin(ang*6)));
    vec3 rgb=vec3(1.0-clamp(v,0.0,1.0)*0.9,clamp(v,0.0,1.0)*0.2,clamp(v,0.0,1.0));
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}