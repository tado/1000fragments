uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float y0, y1, y2, y3, v=0.0;
    y0=sin(st.x*25.1200+time*5.0000)*0.1200+0.2200; v+=smoothstep(0.0070,0.0,abs(st.y-y0));
    y1=sin(st.x*37.6800+time*6.5000)*0.1600+0.3700; v+=smoothstep(0.0070,0.0,abs(st.y-y1));
    y2=sin(st.x*50.2400+time*8.0000)*0.2000+0.5200; v+=smoothstep(0.0070,0.0,abs(st.y-y2));
    y3=sin(st.x*62.8000+time*9.5000)*0.2400+0.6700; v+=smoothstep(0.0070,0.0,abs(st.y-y3));
    vec3 rgb=vec3(0.05,0.05,0.1)+vec3(v*0.5,0.0,v)*clamp(v,0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}