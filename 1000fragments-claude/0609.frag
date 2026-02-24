uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x), r=length(uv);
    float curve=0.5*(1.0+cos(angle+time*0.9000));
    float d=abs(r-curve);
    float glow=smoothstep(0.0600,0.0,d)+smoothstep(0.1600,0.0600,d)*0.3;
    vec3 rgb=vec3(glow,0.1,1.0-glow);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}