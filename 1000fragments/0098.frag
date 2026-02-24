uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 hash2(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}
void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy-0.5;
    uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x);
    float r=length(uv);
    float sv=sin(angle*4.0+r*15.0-time*5.0)*0.5+0.5;
    float particles=0.0;
    for(float i=0.0;i<8.0;i++){
        float a=i*6.28318/8.0+time*0.4;
        float rad=0.3+sin(time*0.7+i*0.4)*0.2;
        vec2 c=vec2(cos(a)*rad,sin(a)*rad);
        particles+=0.015/(length(uv-c)+0.005);
    }
    float v=sv*0.5+particles;
    float hue=angle/6.28318+time*0.15;
    fragColor=TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5),v*(sin(hue*6.28+2.094)*0.5+0.5),v*(sin(hue*6.28+4.189)*0.5+0.5),1.0));
}
