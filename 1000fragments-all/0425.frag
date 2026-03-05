uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float a=0.5000;
    vec2 s1=st*13.5000;
    vec2 s2=vec2(st.x*cos(a)-st.y*sin(a),st.x*sin(a)+st.y*cos(a))*14.0000;
    float g1=sin(s1.x+time*1.5000)*sin(s1.y+time*1.0500);
    float g2=sin(s2.x-time*1.3500)*sin(s2.y-time*1.2000);
    float v=(g1+g2)*0.5+0.5;
    vec3 rgb=vec3(1.0-v*0.9,v*0.2,v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}