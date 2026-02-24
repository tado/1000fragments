uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
float noise(vec2 st) {
    vec2 i=floor(st), f=fract(st);
    float a=random(i), b=random(i+vec2(1,0)), c=random(i+vec2(0,1)), d=random(i+vec2(1,1));
    vec2 u=f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 st, int oct) {
    float v=0.0, a=0.5;
    for(int i=0;i<8;i++){if(i>=oct)break; v+=a*noise(st); st*=2.0; a*=0.5;}
    return v;
}
void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float ang=atan(uv.y,uv.x), r=length(uv);
    float seg=6.28318/6.0000; float fold=mod(ang+time*0.8000,seg); if(fold>seg*0.5) fold=seg-fold;
    vec2 p=vec2(cos(fold),sin(fold))*r;
    vec2 q=vec2(fbm(p*2.0+time*0.1,4),fbm(p*2.0+vec2(3.1,2.7)+time*0.08,4));
    float f=fbm(p+4.0*q,4);
    vec3 rgb=vec3(0.1,f*0.6,f);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}