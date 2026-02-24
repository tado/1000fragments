uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x), r=length(uv);
    float curve=abs(cos(angle*2.0000+time*0.4500));
    float d=abs(r-curve);
    float glow=smoothstep(0.0750,0.0,d)+smoothstep(0.2000,0.0750,d)*0.3;
    vec3 rgb=vec3(glow*1.8,glow*0.7,0.1);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}