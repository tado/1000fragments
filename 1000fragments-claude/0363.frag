uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy; uv.x*=resolution.x/resolution.y;
    float stars=0.0;
    {vec2 lv=fract(uv*20.9000+vec2(0.0,time*0.3750))-0.5; stars+=0.0080/length(lv);}
    {vec2 lv=fract(uv*35.9000+vec2(0.0,time*0.7500))-0.5; stars+=0.0160/length(lv);}
    {vec2 lv=fract(uv*50.9000+vec2(0.0,time*1.1250))-0.5; stars+=0.0240/length(lv);}
    {vec2 lv=fract(uv*65.9000+vec2(0.0,time*1.5000))-0.5; stars+=0.0320/length(lv);}
    {vec2 lv=fract(uv*80.9000+vec2(0.0,time*1.8750))-0.5; stars+=0.0400/length(lv);}
    stars=clamp(stars,0.0,1.0);
    vec3 rgb=clamp(vec3(stars*1.5,stars*0.5,stars*2.0),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}