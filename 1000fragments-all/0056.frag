uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy-resolution.xy*0.5)/min(resolution.x,resolution.y);
    float ang,v=0.0;
    ang=atan(uv.y,uv.x)+time*3.7000+0.0000; v+=smoothstep(0.0020,0.0,abs(sin(ang*1)));
    ang=atan(uv.y,uv.x)+time*4.4400+0.6283; v+=smoothstep(0.0020,0.0,abs(sin(ang*2)));
    ang=atan(uv.y,uv.x)+time*5.1800+1.2566; v+=smoothstep(0.0020,0.0,abs(sin(ang*3)));
    ang=atan(uv.y,uv.x)+time*5.9200+1.8850; v+=smoothstep(0.0020,0.0,abs(sin(ang*4)));
    ang=atan(uv.y,uv.x)+time*6.6600+2.5133; v+=smoothstep(0.0020,0.0,abs(sin(ang*5)));
    vec3 rgb=vec3(clamp(v,0.0,1.0)*1.8,clamp(v,0.0,1.0)*0.7,0.1);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}