uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float y0, y1, y2, y3, y4, y5, v=0.0;
    y0=sin(st.x*18.8400+time*4.2000)*0.1200+0.0800; v+=smoothstep(0.0110,0.0,abs(st.y-y0));
    y1=sin(st.x*31.4000+time*5.4600)*0.1600+0.2300; v+=smoothstep(0.0110,0.0,abs(st.y-y1));
    y2=sin(st.x*43.9600+time*6.7200)*0.2000+0.3800; v+=smoothstep(0.0110,0.0,abs(st.y-y2));
    y3=sin(st.x*56.5200+time*7.9800)*0.2400+0.5300; v+=smoothstep(0.0110,0.0,abs(st.y-y3));
    y4=sin(st.x*69.0800+time*9.2400)*0.2800+0.6800; v+=smoothstep(0.0110,0.0,abs(st.y-y4));
    y5=sin(st.x*81.6400+time*10.5000)*0.3200+0.8300; v+=smoothstep(0.0110,0.0,abs(st.y-y5));
    vec3 rgb=vec3(0.05,0.08,0.05)+vec3(0.0,v,v*0.5)*clamp(v,0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}