uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy; uv.x*=resolution.x/resolution.y;
    float stars=0.0;
    {vec2 lv=fract(uv*21.5000+vec2(0.0,time*0.5250))-0.5; stars+=0.0020/length(lv);}
    {vec2 lv=fract(uv*36.5000+vec2(0.0,time*1.0500))-0.5; stars+=0.0040/length(lv);}
    {vec2 lv=fract(uv*51.5000+vec2(0.0,time*1.5750))-0.5; stars+=0.0060/length(lv);}
    stars=clamp(stars,0.0,1.0);
    vec3 rgb=clamp(vec3(stars*0.4,stars*1.2,stars*0.6),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}