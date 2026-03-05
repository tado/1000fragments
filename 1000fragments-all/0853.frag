uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float scale=2.0000, spd=0.3500;
    vec2 p=st;
    vec2 gv=abs(fract(p*scale)-0.5);
    float v=abs(sin(gv.x*6.28318)*sin(gv.y*6.28318));
    vec3 rgb=vec3(1.0-v*0.9,v*0.2,v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}