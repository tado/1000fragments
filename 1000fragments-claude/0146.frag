uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    vec2 pos; float t=0.0;
    pos=vec2(sin(time*0.6400+0.0000)*0.4200,cos(time*0.5600)*0.4200); t+=0.0200/length(pos-uv);
    pos=vec2(sin(time*0.8800+0.6280)*0.4200,cos(time*0.7600)*0.4400); t+=0.0200/length(pos-uv);
    pos=vec2(sin(time*1.1200+1.2560)*0.4200,cos(time*0.9600)*0.4600); t+=0.0200/length(pos-uv);
    pos=vec2(sin(time*1.3600+1.8840)*0.4200,cos(time*1.1600)*0.4800); t+=0.0200/length(pos-uv);
    pos=vec2(sin(time*1.6000+2.5120)*0.4200,cos(time*1.3600)*0.5000); t+=0.0200/length(pos-uv);
    pos=vec2(sin(time*1.8400+3.1400)*0.4200,cos(time*1.5600)*0.5200); t+=0.0200/length(pos-uv);
    pos=vec2(sin(time*2.0800+3.7680)*0.4200,cos(time*1.7600)*0.5400); t+=0.0200/length(pos-uv);
    pos=vec2(sin(time*2.3200+4.3960)*0.4200,cos(time*1.9600)*0.5600); t+=0.0200/length(pos-uv);
    pos=vec2(sin(time*2.5600+5.0240)*0.4200,cos(time*2.1600)*0.5800); t+=0.0200/length(pos-uv);
    vec3 rgb=clamp(1.0-mod(vec3(t)*0.04,1.0),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}