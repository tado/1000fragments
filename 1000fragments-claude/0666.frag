uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float zoom=mod(time*0.6000,1.0);
    float scale=pow(6.5000,zoom);
    vec2 p=fract(uv*scale*0.5+0.5);
    float v=sin(p.x*6.28318)*sin(p.y*6.28318);
    float fade=sin(zoom*3.14159);
    v=v*fade+sin(fract(uv*scale/6.5000*0.5+0.5).x*6.28318)*sin(fract(uv*scale/6.5000*0.5+0.5).y*6.28318)*(1.0-fade);
    vec3 rgb=vec3(v*0.5+0.5*0.3,v*0.5+0.5*1.2,v*0.5+0.5*0.8);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}