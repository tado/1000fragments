uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 lp; vec3 acc=vec3(0.0);
    lp=vec2(sin(time*0.2100+0.0000)*0.6500,cos(time*0.1800+0.0000)*0.4000); acc+=0.0010/max(length(uv-lp)-0.0600,0.001)*vec3(abs(sin(0.0000)),abs(sin(2.0940)),abs(sin(4.1890)));
    lp=vec2(sin(time*0.3000+2.0940)*0.6500,cos(time*0.2550+1.0470)*0.4000); acc+=0.0010/max(length(uv-lp)-0.0600,0.001)*vec3(abs(sin(2.0940)),abs(sin(4.1880)),abs(sin(6.2830)));
    lp=vec2(sin(time*0.3900+4.1880)*0.6500,cos(time*0.3300+2.0940)*0.4000); acc+=0.0010/max(length(uv-lp)-0.0600,0.001)*vec3(abs(sin(4.1880)),abs(sin(6.2820)),abs(sin(8.3770)));
    lp=vec2(sin(time*0.4800+6.2820)*0.6500,cos(time*0.4050+3.1410)*0.4000); acc+=0.0010/max(length(uv-lp)-0.0600,0.001)*vec3(abs(sin(6.2820)),abs(sin(8.3760)),abs(sin(10.4710)));
    vec3 rgb=clamp(acc*vec3(1.2,1.0,0.8),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}