uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float zoom=mod(time*0.6000,1.0);
    float scale=pow(5.0000,zoom);
    vec2 p=fract(uv*scale*0.5+0.5);
    float v=length(fract(p*3.0)-0.5)*2.0;
    float fade=sin(zoom*3.14159);
    v=v*fade+length(fract(fract(uv*scale/5.0000*0.5+0.5)*3.0)-0.5)*2.0*(1.0-fade);
    vec3 rgb=vec3(0.1,v*0.5+0.5*0.6,v*0.5+0.5);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}