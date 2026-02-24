uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x), r=length(uv);
    float curve=abs(cos(angle*3.5000+time*0.6000));
    float d=abs(r-curve);
    float glow=smoothstep(0.0150,0.0,d)+smoothstep(0.0400,0.0150,d)*0.3;
    vec3 rgb=vec3(0.1,glow*0.6,glow);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}