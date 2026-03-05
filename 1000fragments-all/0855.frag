uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float scale=3.6000, spd=0.1500;
    vec2 p=st;
    const float sqrt3=1.7320508;
    vec2 r=vec2(1.0,sqrt3)*scale; vec2 h=r*0.5;
    vec2 a=mod(p,r)-h, b=mod(p-h,r)-h;
    vec2 gv=dot(a,a)<dot(b,b)?a:b;
    float v=mod(atan(gv.y,gv.x)/1.0472+time*spd,1.0);
    vec3 rgb=vec3(0.05,v*1.5,v*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}