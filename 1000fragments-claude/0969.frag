uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 lp; vec3 acc=vec3(0.0);
    lp=vec2(sin(time*0.4900+0.0000)*0.6500,cos(time*0.4200+0.0000)*0.4600); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(0.0000)),abs(sin(2.0940)),abs(sin(4.1890)));
    lp=vec2(sin(time*0.7000+2.0940)*0.6500,cos(time*0.5950+1.0470)*0.4600); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(2.0940)),abs(sin(4.1880)),abs(sin(6.2830)));
    lp=vec2(sin(time*0.9100+4.1880)*0.6500,cos(time*0.7700+2.0940)*0.4600); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(4.1880)),abs(sin(6.2820)),abs(sin(8.3770)));
    vec3 rgb=clamp(acc*vec3(1.2,1.0,0.8),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}