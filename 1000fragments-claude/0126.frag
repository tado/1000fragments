uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=abs(sin((st.x+st.y)*17.7600+time*4.5000));
    vec3 rgb=vec3(v*1.8,v*0.7,0.1);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}