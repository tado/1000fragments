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
void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float v=0.0;
    {float seg0=6.28318/6.0000; float a0=mod(atan(uv.y,uv.x)+time*0.5000,seg0); if(a0>seg0*0.5) a0=seg0-a0; vec2 p=vec2(cos(a0),sin(a0))*length(uv); v+=noise(p*4.0);}
    {float seg1=6.28318/12.0000; float a1=mod(atan(uv.y,uv.x)+time*1.0000,seg1); if(a1>seg1*0.5) a1=seg1-a1; vec2 p=vec2(cos(a1),sin(a1))*length(uv); v+=noise(p*4.0);}
    {float seg2=6.28318/18.0000; float a2=mod(atan(uv.y,uv.x)+time*1.5000,seg2); if(a2>seg2*0.5) a2=seg2-a2; vec2 p=vec2(cos(a2),sin(a2))*length(uv); v+=noise(p*4.0);}
    {float seg3=6.28318/24.0000; float a3=mod(atan(uv.y,uv.x)+time*2.0000,seg3); if(a3>seg3*0.5) a3=seg3-a3; vec2 p=vec2(cos(a3),sin(a3))*length(uv); v+=noise(p*4.0);}
    vec3 rgb=clamp(vec3(abs(sin(clamp(v/4.0000,0.0,1.0)*3.14159)),abs(sin(clamp(v/4.0000,0.0,1.0)*3.14159+2.094)),abs(sin(clamp(v/4.0000,0.0,1.0)*3.14159+4.189))),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}