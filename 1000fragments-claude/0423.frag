uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float a=0.3000;
    vec2 s1=st*12.1000;
    vec2 s2=vec2(st.x*cos(a)-st.y*sin(a),st.x*sin(a)+st.y*cos(a))*12.6000;
    float g1=sin(s1.x+time*1.1000)*sin(s1.y+time*0.7700);
    float g2=sin(s2.x-time*0.9900)*sin(s2.y-time*0.8800);
    float v=(g1+g2)*0.5+0.5;
    vec3 rgb=vec3(abs(sin(v*3.14159)),abs(sin(v*3.14159+2.094)),abs(sin(v*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}