uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    uv.x+=sin(uv.y*6.0000+time*2.2000)*0.15;
    uv.y+=cos(uv.x*4.0000+time*1.6500)*0.12;
    vec2 pos; float t=0.0;
    for(int i=0;i<6;i++){
        float fi=float(i);
        pos=vec2(sin(time*0.9000*(fi+1.0))*1.5, cos(time*0.9000+fi)*1.8);
        t+=0.025/length(pos-uv);
    }
    vec3 rgb=1.0-mod(vec3(t)*0.15,1.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}