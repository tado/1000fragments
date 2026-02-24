uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float scale=4.4000, spd=0.1500;
    vec2 p=st;
    vec2 gv=abs(fract(p*scale)-0.5);
    float v=abs(sin(gv.x*6.28318)*sin(gv.y*6.28318));
    vec3 rgb=vec3(abs(sin(v*3.14159)),abs(sin(v*3.14159+2.094)),abs(sin(v*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}