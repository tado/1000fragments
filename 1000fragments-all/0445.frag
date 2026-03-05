uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float v=0.0;
    {float seg0=6.28318/8.0000; float a0=mod(atan(uv.y,uv.x)+time*0.7000,seg0); if(a0>seg0*0.5) a0=seg0-a0; vec2 p=vec2(cos(a0),sin(a0))*length(uv); v+=sin(length(p)*8.0)*0.5+0.5;}
    {float seg1=6.28318/16.0000; float a1=mod(atan(uv.y,uv.x)+time*1.4000,seg1); if(a1>seg1*0.5) a1=seg1-a1; vec2 p=vec2(cos(a1),sin(a1))*length(uv); v+=sin(length(p)*8.0)*0.5+0.5;}
    vec3 rgb=clamp(vec3(1.0-clamp(v/2.0000,0.0,1.0)*0.9,clamp(v/2.0000,0.0,1.0)*0.2,clamp(v/2.0000,0.0,1.0)),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}