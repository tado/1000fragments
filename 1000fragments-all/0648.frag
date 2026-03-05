uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float y0, y1, y2, y3, y4, y5, v=0.0;
    y0=sin(st.x*12.5600+time*3.4000)*0.1200+0.0800; v+=smoothstep(0.0110,0.0,abs(st.y-y0));
    y1=sin(st.x*25.1200+time*4.4200)*0.1600+0.2300; v+=smoothstep(0.0110,0.0,abs(st.y-y1));
    y2=sin(st.x*37.6800+time*5.4400)*0.2000+0.3800; v+=smoothstep(0.0110,0.0,abs(st.y-y2));
    y3=sin(st.x*50.2400+time*6.4600)*0.2400+0.5300; v+=smoothstep(0.0110,0.0,abs(st.y-y3));
    y4=sin(st.x*62.8000+time*7.4800)*0.2800+0.6800; v+=smoothstep(0.0110,0.0,abs(st.y-y4));
    y5=sin(st.x*75.3600+time*8.5000)*0.3200+0.8300; v+=smoothstep(0.0110,0.0,abs(st.y-y5));
    vec3 rgb=vec3(0.0)+vec3(v,v*0.5,0.0)*clamp(v,0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}