uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float y0, y1, y2, y3, v=0.0;
    y0=sin(st.x*12.5600+time*1.0000)*0.1200+0.2200; v+=smoothstep(0.0070,0.0,abs(st.y-y0));
    y1=sin(st.x*25.1200+time*1.3000)*0.1600+0.3700; v+=smoothstep(0.0070,0.0,abs(st.y-y1));
    y2=sin(st.x*37.6800+time*1.6000)*0.2000+0.5200; v+=smoothstep(0.0070,0.0,abs(st.y-y2));
    y3=sin(st.x*50.2400+time*1.9000)*0.2400+0.6700; v+=smoothstep(0.0070,0.0,abs(st.y-y3));
    vec3 rgb=vec3(0.0)+vec3(v,v*0.5,0.0)*clamp(v,0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}