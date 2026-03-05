uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float y0, y1, y2, v=0.0;
    y0=sin(st.x*18.8400+time*4.2000)*0.1200+0.2900; v+=smoothstep(0.0050,0.0,abs(st.y-y0));
    y1=sin(st.x*31.4000+time*5.4600)*0.1600+0.4400; v+=smoothstep(0.0050,0.0,abs(st.y-y1));
    y2=sin(st.x*43.9600+time*6.7200)*0.2000+0.5900; v+=smoothstep(0.0050,0.0,abs(st.y-y2));
    vec3 rgb=vec3(0.05,0.08,0.05)+vec3(0.0,v,v*0.5)*clamp(v,0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}