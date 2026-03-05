uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), angle=atan(uv.y,uv.x)+time*1.2500;
    float sector=floor(mod(angle/1.0472,1.0)*2.0);
    float ring=mod(r*6.0000,1.0);
    float v=mod(sector+floor(ring+time*1.2500),2.0);
    float edge=smoothstep(0.0,0.1100,min(fract(angle/1.0472),1.0-fract(angle/1.0472)));
    v=v*edge*smoothstep(1.2,0.3400,r);
    vec3 rgb=vec3(abs(sin(v*3.14159)),abs(sin(v*3.14159+2.094)),abs(sin(v*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}