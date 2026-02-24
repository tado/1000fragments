uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x), r=length(uv);
    float curve=abs(sin(angle*6.0000+time*0.4500)*cos(angle*7.0000+time*0.5850));
    float d=abs(r-curve);
    float glow=smoothstep(0.0900,0.0,d)+smoothstep(0.2400,0.0900,d)*0.3;
    vec3 rgb=vec3(glow,glow*0.5,0.15);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}