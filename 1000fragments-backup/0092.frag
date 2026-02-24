uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy-0.5;
    uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x);
    float r=length(uv);
    uv.x+=sin(angle*8.0+time*3.0)*0.05;
    uv.y+=cos(r*20.0-time*4.0)*0.05;
    float grid=step(0.45,fract(uv.x*10.0))+step(0.45,fract(uv.y*10.0));
    float glow=0.0;
    for(float i=0.0;i<6.0;i++){
        vec2 c=vec2(cos(time*0.4+i*1.047)*0.4,sin(time*0.4+i*1.047)*0.4);
        glow+=0.02/(length(uv-c)+0.01);
    }
    float v=min(grid+glow,3.0);
    float hue=r*2.0+time*0.2;
    fragColor=TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5),v*(sin(hue*6.28+2.094)*0.5+0.5),v*(sin(hue*6.28+4.189)*0.5+0.5),1.0));
}
