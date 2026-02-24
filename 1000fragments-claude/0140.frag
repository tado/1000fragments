uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    vec2 pos; float t=0.0;
    pos=vec2(sin(time*0.6400+0.0000)*0.3000,cos(time*0.5600)*0.3000); t+=0.0200/length(pos-uv);
    pos=vec2(sin(time*0.8800+0.6280)*0.3000,cos(time*0.7600)*0.3200); t+=0.0200/length(pos-uv);
    pos=vec2(sin(time*1.1200+1.2560)*0.3000,cos(time*0.9600)*0.3400); t+=0.0200/length(pos-uv);
    vec3 rgb=clamp(1.0-mod(vec3(t)*0.04,1.0),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}