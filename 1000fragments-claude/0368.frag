uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy; uv.x*=resolution.x/resolution.y;
    float stars=0.0;
    {vec2 lv=fract(uv*22.4000+vec2(0.0,time*0.3000))-0.5; stars+=0.0080/length(lv);}
    {vec2 lv=fract(uv*37.4000+vec2(0.0,time*0.6000))-0.5; stars+=0.0160/length(lv);}
    stars=clamp(stars,0.0,1.0);
    vec3 rgb=clamp(vec3(stars*0.3,stars*0.7,stars),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}