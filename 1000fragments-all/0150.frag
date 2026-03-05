uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    vec2 pos; float t=0.0;
    pos=vec2(sin(time*1.9200+0.0000)*0.3000,cos(time*1.6800)*0.3000); t+=0.0520/length(pos-uv);
    pos=vec2(sin(time*2.6400+0.6280)*0.3000,cos(time*2.2800)*0.3200); t+=0.0520/length(pos-uv);
    pos=vec2(sin(time*3.3600+1.2560)*0.3000,cos(time*2.8800)*0.3400); t+=0.0520/length(pos-uv);
    pos=vec2(sin(time*4.0800+1.8840)*0.3000,cos(time*3.4800)*0.3600); t+=0.0520/length(pos-uv);
    pos=vec2(sin(time*4.8000+2.5120)*0.3000,cos(time*4.0800)*0.3800); t+=0.0520/length(pos-uv);
    vec3 rgb=clamp(1.0-mod(vec3(t)*0.04,1.0),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}