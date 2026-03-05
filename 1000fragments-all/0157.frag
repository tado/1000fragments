uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    vec2 pos; float t=0.0;
    pos=vec2(sin(time*2.2400+0.0000)*0.5400,cos(time*1.9600)*0.5400); t+=0.0600/length(pos-uv);
    pos=vec2(sin(time*3.0800+0.6280)*0.5400,cos(time*2.6600)*0.5600); t+=0.0600/length(pos-uv);
    pos=vec2(sin(time*3.9200+1.2560)*0.5400,cos(time*3.3600)*0.5800); t+=0.0600/length(pos-uv);
    pos=vec2(sin(time*4.7600+1.8840)*0.5400,cos(time*4.0600)*0.6000); t+=0.0600/length(pos-uv);
    vec3 rgb=clamp(vec3(t*0.08,t*0.03,t*0.12),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}