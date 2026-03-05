uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=abs(sin(st.x*21.0000+time*11.0000))*abs(sin(st.y*21.0000-time*7.7000));
    vec3 rgb=vec3(v,0.1,1.0-v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}