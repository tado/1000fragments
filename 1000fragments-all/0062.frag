uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    st.x+=sin(st.y*11.5000+time*3.1000+0.0000)*0.1300; st.y+=cos(st.x*7.0000+time*3.4100)*0.2100;
    st.x+=sin(st.y*13.5000+time*3.4000+1.5700)*0.1300; st.y+=cos(st.x*9.0000+time*3.6100)*0.2100;
    st.x+=sin(st.y*15.5000+time*3.7000+3.1400)*0.1300; st.y+=cos(st.x*11.0000+time*3.8100)*0.2100;
    float v=abs(sin(st.x*7.0000+st.y*11.5000+time*3.1000));
    vec3 rgb=vec3(0.1,v*0.6,v);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}