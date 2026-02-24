uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    st.x+=sin(st.y*11.5000+time*3.9000+0.0000)*0.0500; st.y+=cos(st.x*7.0000+time*4.2900)*0.1300;
    float v=abs(sin(st.x*7.0000+st.y*11.5000+time*3.9000));
    vec3 rgb=vec3(v*0.3,v*1.2,v*0.8);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}