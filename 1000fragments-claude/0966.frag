uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 lp; vec3 acc=vec3(0.0);
    lp=vec2(sin(time*0.7700+0.0000)*0.5000,cos(time*0.6600+0.0000)*0.4600); acc+=0.0030/max(length(uv-lp)-0.1800,0.001)*vec3(abs(sin(0.0000)),abs(sin(2.0940)),abs(sin(4.1890)));
    lp=vec2(sin(time*1.1000+2.0940)*0.5000,cos(time*0.9350+1.0470)*0.4600); acc+=0.0030/max(length(uv-lp)-0.1800,0.001)*vec3(abs(sin(2.0940)),abs(sin(4.1880)),abs(sin(6.2830)));
    lp=vec2(sin(time*1.4300+4.1880)*0.5000,cos(time*1.2100+2.0940)*0.4600); acc+=0.0030/max(length(uv-lp)-0.1800,0.001)*vec3(abs(sin(4.1880)),abs(sin(6.2820)),abs(sin(8.3770)));
    lp=vec2(sin(time*1.7600+6.2820)*0.5000,cos(time*1.4850+3.1410)*0.4600); acc+=0.0030/max(length(uv-lp)-0.1800,0.001)*vec3(abs(sin(6.2820)),abs(sin(8.3760)),abs(sin(10.4710)));
    lp=vec2(sin(time*2.0900+8.3760)*0.5000,cos(time*1.7600+4.1880)*0.4600); acc+=0.0030/max(length(uv-lp)-0.1800,0.001)*vec3(abs(sin(8.3760)),abs(sin(10.4700)),abs(sin(12.5650)));
    lp=vec2(sin(time*2.4200+10.4700)*0.5000,cos(time*2.0350+5.2350)*0.4600); acc+=0.0030/max(length(uv-lp)-0.1800,0.001)*vec3(abs(sin(10.4700)),abs(sin(12.5640)),abs(sin(14.6590)));
    lp=vec2(sin(time*2.7500+12.5640)*0.5000,cos(time*2.3100+6.2820)*0.4600); acc+=0.0030/max(length(uv-lp)-0.1800,0.001)*vec3(abs(sin(12.5640)),abs(sin(14.6580)),abs(sin(16.7530)));
    vec3 rgb=clamp(acc*vec3(2.0,0.5,1.5),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}