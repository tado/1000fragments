uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float radius=length(uv), angle=atan(uv.y,uv.x)+time*0.9000;
    float spiral=mod(angle*2.0000/6.28318+radius*10.5000,1.0);
    float v=smoothstep(0.0500,0.0,abs(spiral-0.5)-0.0150)*smoothstep(1.0,0.5,radius);
    vec3 rgb=vec3(1.0-v*0.9,v*0.2,v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}