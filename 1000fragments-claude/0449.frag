uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float v=0.0;
    {float seg0=6.28318/4.0000; float a0=mod(atan(uv.y,uv.x)+time*0.5000,seg0); if(a0>seg0*0.5) a0=seg0-a0; vec2 p=vec2(cos(a0),sin(a0))*length(uv); v+=abs(sin(p.x*10.0+p.y*8.0));}
    {float seg1=6.28318/8.0000; float a1=mod(atan(uv.y,uv.x)+time*1.0000,seg1); if(a1>seg1*0.5) a1=seg1-a1; vec2 p=vec2(cos(a1),sin(a1))*length(uv); v+=abs(sin(p.x*10.0+p.y*8.0));}
    vec3 rgb=clamp(vec3(clamp(v/2.0000,0.0,1.0),0.1,1.0-clamp(v/2.0000,0.0,1.0)),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}