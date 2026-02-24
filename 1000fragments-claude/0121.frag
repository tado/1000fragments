uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=abs(sin(st.x*9.4248+time*2.0000));
    vec3 rgb=vec3(v,v*0.5,0.15);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}