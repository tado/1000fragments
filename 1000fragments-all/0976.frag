uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 lp; vec3 acc=vec3(0.0);
    lp=vec2(sin(time*0.7700+0.0000)*0.6000,cos(time*0.6600+0.0000)*0.5200); acc+=0.0030/max(length(uv-lp)-0.1800,0.001)*vec3(abs(sin(0.0000)),abs(sin(2.0940)),abs(sin(4.1890)));
    lp=vec2(sin(time*1.1000+2.0940)*0.6000,cos(time*0.9350+1.0470)*0.5200); acc+=0.0030/max(length(uv-lp)-0.1800,0.001)*vec3(abs(sin(2.0940)),abs(sin(4.1880)),abs(sin(6.2830)));
    lp=vec2(sin(time*1.4300+4.1880)*0.6000,cos(time*1.2100+2.0940)*0.5200); acc+=0.0030/max(length(uv-lp)-0.1800,0.001)*vec3(abs(sin(4.1880)),abs(sin(6.2820)),abs(sin(8.3770)));
    vec3 rgb=clamp(vec3(acc.r+acc.g,acc.g,acc.b+acc.r)*0.7,0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}