uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    st.x+=sin(st.y*4.0000+time*1.5000+0.0000)*0.2500; st.y+=cos(st.x*11.5000+time*1.6500)*0.0900;
    st.x+=sin(st.y*6.0000+time*1.8000+1.5700)*0.2500; st.y+=cos(st.x*13.5000+time*1.8500)*0.0900;
    st.x+=sin(st.y*8.0000+time*2.1000+3.1400)*0.2500; st.y+=cos(st.x*15.5000+time*2.0500)*0.0900;
    float v=abs(sin(st.x*11.5000+st.y*4.0000+time*1.5000));
    vec3 rgb=vec3(1.0-v*0.9,v*0.2,v);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}