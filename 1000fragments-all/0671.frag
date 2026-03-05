uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float zoom=mod(time*0.4500,1.0);
    float scale=pow(6.5000,zoom);
    vec2 p=fract(uv*scale*0.5+0.5);
    float v=step(0.5,fract(p.x*3.0))*step(0.5,fract(p.y*3.0));
    float fade=sin(zoom*3.14159);
    v=v*fade+step(0.5,fract(fract(uv*scale/6.5000*0.5+0.5).x*3.0))*step(0.5,fract(fract(uv*scale/6.5000*0.5+0.5).y*3.0))*(1.0-fade);
    vec3 rgb=vec3(abs(sin(v*0.5+0.5*3.14159)),abs(sin(v*0.5+0.5*3.14159+2.094)),abs(sin(v*0.5+0.5*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}