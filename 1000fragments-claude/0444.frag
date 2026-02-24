uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float v=0.0;
    {float seg0=6.28318/7.0000; float a0=mod(atan(uv.y,uv.x)+time*0.6000,seg0); if(a0>seg0*0.5) a0=seg0-a0; vec2 p=vec2(cos(a0),sin(a0))*length(uv); v+=abs(sin(p.x*10.0+p.y*8.0));}
    vec3 rgb=clamp(vec3(clamp(v/1.0000,0.0,1.0)*2.5,clamp(v/1.0000,0.0,1.0)*0.4,clamp(v/1.0000,0.0,1.0)*3.0),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}