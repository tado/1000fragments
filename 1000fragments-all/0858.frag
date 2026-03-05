uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float scale=2.0000, spd=0.3000;
    vec2 p=st;
    vec2 gv=fract(p*scale)-0.5;
    gv=abs(gv);
    float v=step(gv.x+gv.y,0.5)*sin(time*spd);
    vec3 rgb=vec3(v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}