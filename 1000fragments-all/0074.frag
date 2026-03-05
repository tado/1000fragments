uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    st.x+=sin(st.y*5.5000+time*4.7000+0.0000)*0.1300; st.y+=cos(st.x*13.0000+time*5.1700)*0.2100;
    st.x+=sin(st.y*7.5000+time*5.0000+1.5700)*0.1300; st.y+=cos(st.x*15.0000+time*5.3700)*0.2100;
    st.x+=sin(st.y*9.5000+time*5.3000+3.1400)*0.1300; st.y+=cos(st.x*17.0000+time*5.5700)*0.2100;
    float v=abs(sin(st.x*13.0000+st.y*5.5000+time*4.7000));
    vec3 rgb=vec3(v*2.5,v*0.4,v*3.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}