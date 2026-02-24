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
    float angle=atan(uv.y,uv.x), radius=length(uv);
    float seg=6.28318/3.0000;
    angle=mod(angle+time*1.2600,seg);
    if(angle>seg*0.5) angle=seg-angle;
    uv=vec2(cos(angle),sin(angle))*radius;
float v=fbm(uv*2.5+vec2(time*0.1),4);
    vec3 rgb=clamp(vec3(v*1.8,v*0.7,0.1),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}