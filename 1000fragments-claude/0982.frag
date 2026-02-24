uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}
vec3 hsb2rgb(vec3 c) {
    vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
    vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);
    return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);
}
void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    st*=3.5000;
    vec2 is=floor(st), fs=fract(st); float m=1.0;
    for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){vec2 nb=vec2(x,y),pt=random2(is+nb); pt=0.5+0.5*sin(time*0.6000+6.28318*pt); m=min(m,length(nb+pt-fs));}
    float ang=atan(st.y-float(int(st.y))-0.5,st.x-float(int(st.x))-0.5);
    vec3 rgb=hsb2rgb(vec3(m*0.5+ang/6.28318+time*0.05,0.85,m));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}