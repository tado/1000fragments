uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), angle=atan(uv.y,uv.x)+time*0.5000;
    float sector=floor(mod(angle/0.6981,1.0)*2.0);
    float ring=mod(r*4.0000,1.0);
    float v=mod(sector+floor(ring+time*0.5000),2.0);
    float edge=smoothstep(0.0,0.0900,min(fract(angle/0.6981),1.0-fract(angle/0.6981)));
    v=v*edge*smoothstep(1.2,0.2600,r);
    vec3 rgb=vec3(v*1.8,v*0.7,0.1);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}