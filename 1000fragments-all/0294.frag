uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; float t=time*1.0000;
    float v=sin(st.x*36.0000+t)+sin(st.y*58.0000+t*1.3)+sin((st.x+st.y)*23.1000+t*0.7)+sin(length(st-0.5)*54.0000-t*2.0);
    v=v*0.25+0.5;
    vec3 rgb=clamp(vec3(v*v*2.0,v*1.2,(1.0-v)*1.5),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}