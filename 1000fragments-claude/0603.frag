uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x), r=length(uv);
    float curve=abs(sin(angle*5.0000+time*0.7500)*cos(angle*6.0000+time*0.9750));
    float d=abs(r-curve);
    float glow=smoothstep(0.0600,0.0,d)+smoothstep(0.1600,0.0600,d)*0.3;
    vec3 rgb=vec3(abs(sin(glow*3.14159)),abs(sin(glow*3.14159+2.094)),abs(sin(glow*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}