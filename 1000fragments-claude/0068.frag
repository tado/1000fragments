uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    st.x+=sin(st.y*8.5000+time*3.9000+0.0000)*0.1300; st.y+=cos(st.x*4.0000+time*4.2900)*0.2100;
    st.x+=sin(st.y*10.5000+time*4.2000+1.5700)*0.1300; st.y+=cos(st.x*6.0000+time*4.4900)*0.2100;
    st.x+=sin(st.y*12.5000+time*4.5000+3.1400)*0.1300; st.y+=cos(st.x*8.0000+time*4.6900)*0.2100;
    float v=abs(sin(st.x*4.0000+st.y*8.5000+time*3.9000));
    vec3 rgb=vec3(v*0.3,v*1.2,v*0.8);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}