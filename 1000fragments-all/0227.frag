uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float v=0.0, sz;
    sz=0.6500+sin(time*6.9000+0.0000)*0.1000; v+=step(-sz,uv.x)*step(-sz,uv.y)*step(uv.x,sz)*step(uv.y,sz);
    sz=0.5700+sin(time*7.2000+0.5000)*0.1400; v+=step(-sz,uv.x)*step(-sz,uv.y)*step(uv.x,sz)*step(uv.y,sz);
    sz=0.4900+sin(time*7.5000+1.0000)*0.1800; v+=step(-sz,uv.x)*step(-sz,uv.y)*step(uv.x,sz)*step(uv.y,sz);
    v=mod(v,2.0)<1.0?v:2.0-v;
    vec3 rgb=vec3(0.05,mod(v*0.4,1.0)*1.5,mod(v*0.4,1.0)*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}