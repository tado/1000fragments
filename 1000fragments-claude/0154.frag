uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    vec2 pos; float t=0.0;
    pos=vec2(sin(time*1.2800+0.0000)*0.7800,cos(time*1.1200)*0.7800); t+=0.0360/length(pos-uv);
    pos=vec2(sin(time*1.7600+0.6280)*0.7800,cos(time*1.5200)*0.8000); t+=0.0360/length(pos-uv);
    pos=vec2(sin(time*2.2400+1.2560)*0.7800,cos(time*1.9200)*0.8200); t+=0.0360/length(pos-uv);
    pos=vec2(sin(time*2.7200+1.8840)*0.7800,cos(time*2.3200)*0.8400); t+=0.0360/length(pos-uv);
    pos=vec2(sin(time*3.2000+2.5120)*0.7800,cos(time*2.7200)*0.8600); t+=0.0360/length(pos-uv);
    pos=vec2(sin(time*3.6800+3.1400)*0.7800,cos(time*3.1200)*0.8800); t+=0.0360/length(pos-uv);
    pos=vec2(sin(time*4.1600+3.7680)*0.7800,cos(time*3.5200)*0.9000); t+=0.0360/length(pos-uv);
    pos=vec2(sin(time*4.6400+4.3960)*0.7800,cos(time*3.9200)*0.9200); t+=0.0360/length(pos-uv);
    pos=vec2(sin(time*5.1200+5.0240)*0.7800,cos(time*4.3200)*0.9400); t+=0.0360/length(pos-uv);
    vec3 rgb=clamp(vec3(t*0.08,t*0.03,t*0.12),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}