uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy; uv.x*=resolution.x/resolution.y;
    float stars=0.0;
    {vec2 lv=fract(uv*22.7000+vec2(0.0,time*0.3750))-0.5; stars+=0.0100/length(lv);}
    {vec2 lv=fract(uv*37.7000+vec2(0.0,time*0.7500))-0.5; stars+=0.0200/length(lv);}
    {vec2 lv=fract(uv*52.7000+vec2(0.0,time*1.1250))-0.5; stars+=0.0300/length(lv);}
    stars=clamp(stars,0.0,1.0);
    vec3 rgb=clamp(vec3(stars*1.5,stars*0.5,stars*2.0),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}