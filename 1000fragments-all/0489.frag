uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float g1=sin(st.x*16.5000+time*1.4000)*sin(st.y*13.2000+time*0.9800);
    float a=1.0800; vec2 s2=vec2(st.x*cos(a)-st.y*sin(a),st.x*sin(a)+st.y*cos(a));
    float g2=sin(s2.x*17.0000-time*1.2600)*sin(s2.y*15.3000);
    float scan=abs(sin(st.y*8.0000+time*2.8000))*0.3;
    float v=(g1+g2)*0.25+0.5+scan;
    vec3 rgb=vec3(clamp(v,0.0,1.0),0.1,1.0-clamp(v,0.0,1.0));
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}