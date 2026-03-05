uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy; uv.x*=resolution.x/resolution.y;
    float stars=0.0;
    for(int l=0;l<3;l++){float fl=float(l); vec2 lv=fract(uv*(21.8000+fl*10.0)+vec2(0.0,time*0.4000*(fl+1.0)))-0.5; stars+=0.003/(length(lv)+0.001);}
    float plasma=sin(uv.x*8.0+time*2.0000)*sin(uv.y*6.0+time*2.4000)*0.25+0.25;
    float v=clamp(stars,0.0,1.0)+plasma;
    vec3 rgb=vec3(0.05,clamp(v,0.0,1.0)*1.5,clamp(v,0.0,1.0)*0.3);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}