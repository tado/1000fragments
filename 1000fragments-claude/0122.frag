uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=abs(sin((st.x+st.y)*8.8800+time*2.5000));
    vec3 rgb=vec3(0.1,v*0.6,v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}