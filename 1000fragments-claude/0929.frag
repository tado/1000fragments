uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), angle=atan(uv.y,uv.x)+time*1.7500;
    float sector=floor(mod(angle/0.7854,1.0)*2.0);
    float ring=mod(r*3.0000,1.0);
    float v=mod(sector+floor(ring+time*1.7500),2.0);
    float edge=smoothstep(0.0,0.0700,min(fract(angle/0.7854),1.0-fract(angle/0.7854)));
    v=v*edge*smoothstep(1.2,0.1800,r);
    vec3 rgb=vec3(1.0-v*0.9,v*0.2,v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}