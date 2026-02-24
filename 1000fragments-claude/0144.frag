uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    vec2 pos; float t=0.0;
    pos=vec2(sin(time*1.9200+0.0000)*0.7800,cos(time*1.6800)*0.7800); t+=0.0520/length(pos-uv);
    pos=vec2(sin(time*2.6400+0.6280)*0.7800,cos(time*2.2800)*0.8000); t+=0.0520/length(pos-uv);
    pos=vec2(sin(time*3.3600+1.2560)*0.7800,cos(time*2.8800)*0.8200); t+=0.0520/length(pos-uv);
    pos=vec2(sin(time*4.0800+1.8840)*0.7800,cos(time*3.4800)*0.8400); t+=0.0520/length(pos-uv);
    pos=vec2(sin(time*4.8000+2.5120)*0.7800,cos(time*4.0800)*0.8600); t+=0.0520/length(pos-uv);
    pos=vec2(sin(time*5.5200+3.1400)*0.7800,cos(time*4.6800)*0.8800); t+=0.0520/length(pos-uv);
    pos=vec2(sin(time*6.2400+3.7680)*0.7800,cos(time*5.2800)*0.9000); t+=0.0520/length(pos-uv);
    vec3 rgb=clamp(vec3(t*0.08,t*0.03,t*0.12),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}