uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 lp; vec3 acc=vec3(0.0);
    lp=vec2(sin(time*0.4900+0.0000)*0.5000,cos(time*0.4200+0.0000)*0.4000); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(0.0000)),abs(sin(2.0940)),abs(sin(4.1890)));
    lp=vec2(sin(time*0.7000+2.0940)*0.5000,cos(time*0.5950+1.0470)*0.4000); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(2.0940)),abs(sin(4.1880)),abs(sin(6.2830)));
    lp=vec2(sin(time*0.9100+4.1880)*0.5000,cos(time*0.7700+2.0940)*0.4000); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(4.1880)),abs(sin(6.2820)),abs(sin(8.3770)));
    lp=vec2(sin(time*1.1200+6.2820)*0.5000,cos(time*0.9450+3.1410)*0.4000); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(6.2820)),abs(sin(8.3760)),abs(sin(10.4710)));
    lp=vec2(sin(time*1.3300+8.3760)*0.5000,cos(time*1.1200+4.1880)*0.4000); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(8.3760)),abs(sin(10.4700)),abs(sin(12.5650)));
    lp=vec2(sin(time*1.5400+10.4700)*0.5000,cos(time*1.2950+5.2350)*0.4000); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(10.4700)),abs(sin(12.5640)),abs(sin(14.6590)));
    lp=vec2(sin(time*1.7500+12.5640)*0.5000,cos(time*1.4700+6.2820)*0.4000); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(12.5640)),abs(sin(14.6580)),abs(sin(16.7530)));
    lp=vec2(sin(time*1.9600+14.6580)*0.5000,cos(time*1.6450+7.3290)*0.4000); acc+=0.0020/max(length(uv-lp)-0.1200,0.001)*vec3(abs(sin(14.6580)),abs(sin(16.7520)),abs(sin(18.8470)));
    vec3 rgb=clamp(acc*vec3(2.0,0.5,1.5),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}