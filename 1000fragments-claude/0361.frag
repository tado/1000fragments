uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy; uv.x*=resolution.x/resolution.y;
    float stars=0.0;
    {vec2 lv=fract(uv*20.3000+vec2(0.0,time*0.2250))-0.5; stars+=0.0040/length(lv);}
    {vec2 lv=fract(uv*35.3000+vec2(0.0,time*0.4500))-0.5; stars+=0.0080/length(lv);}
    {vec2 lv=fract(uv*50.3000+vec2(0.0,time*0.6750))-0.5; stars+=0.0120/length(lv);}
    stars=clamp(stars,0.0,1.0);
    vec3 rgb=clamp(vec3(stars,stars*0.7,stars*0.3),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}