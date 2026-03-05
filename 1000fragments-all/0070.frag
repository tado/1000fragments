uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    st.x+=sin(st.y*11.5000+time*1.5000+0.0000)*0.2100; st.y+=cos(st.x*7.0000+time*1.6500)*0.0500;
    st.x+=sin(st.y*13.5000+time*1.8000+1.5700)*0.2100; st.y+=cos(st.x*9.0000+time*1.8500)*0.0500;
    float v=abs(sin(st.x*7.0000+st.y*11.5000+time*1.5000));
    vec3 rgb=vec3(v);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}