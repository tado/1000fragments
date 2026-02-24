uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    st.x+=sin(st.y*7.0000+time*1.5000+0.0000)*0.1700; st.y+=cos(st.x*14.5000+time*1.6500)*0.2500;
    float v=abs(sin(st.x*14.5000+st.y*7.0000+time*1.5000));
    vec3 rgb=vec3(1.0-v*0.9,v*0.2,v);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}