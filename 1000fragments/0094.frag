uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hashf(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    uv.x*=resolution.x/resolution.y;
    vec2 g=floor(uv*8.0);
    vec2 ff=fract(uv*8.0)-0.5;
    float id=hashf(g);
    float ang=id*6.28318+time*(0.5+id*0.5);
    mat2 rot=mat2(cos(ang),-sin(ang),sin(ang),cos(ang));
    vec2 p=rot*ff;
    float stripe=sin(p.x*20.0)*0.5+0.5;
    float circle=step(length(ff),0.4);
    float v=stripe*circle;
    float hue=id+time*0.1;
    fragColor=TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5),v*(sin(hue*6.28+2.094)*0.5+0.5),v*(sin(hue*6.28+4.189)*0.5+0.5),1.0));
}
