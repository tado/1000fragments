uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float v=0.0, sz;
    sz=0.9500+sin(time*4.1000+0.0000)*0.1000; v+=step(-sz,uv.x)*step(-sz,uv.y)*step(uv.x,sz)*step(uv.y,sz);
    sz=0.8700+sin(time*4.4000+0.5000)*0.1400; v+=step(-sz,uv.x)*step(-sz,uv.y)*step(uv.x,sz)*step(uv.y,sz);
    sz=0.7900+sin(time*4.7000+1.0000)*0.1800; v+=step(-sz,uv.x)*step(-sz,uv.y)*step(uv.x,sz)*step(uv.y,sz);
    sz=0.7100+sin(time*5.0000+1.5000)*0.2200; v+=step(-sz,uv.x)*step(-sz,uv.y)*step(uv.x,sz)*step(uv.y,sz);
    v=mod(v,2.0)<1.0?v:2.0-v;
    vec3 rgb=vec3(abs(sin(mod(v*0.4,1.0)*3.14159)),abs(sin(mod(v*0.4,1.0)*3.14159+2.094)),abs(sin(mod(v*0.4,1.0)*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}