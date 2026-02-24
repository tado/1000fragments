uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 lp; vec3 acc=vec3(0.0);
    lp=vec2(sin(time*0.3500+0.0000)*0.6500,cos(time*0.3000+0.0000)*0.5200); acc+=0.0015/max(length(uv-lp)-0.0900,0.001)*vec3(abs(sin(0.0000)),abs(sin(2.0940)),abs(sin(4.1890)));
    lp=vec2(sin(time*0.5000+2.0940)*0.6500,cos(time*0.4250+1.0470)*0.5200); acc+=0.0015/max(length(uv-lp)-0.0900,0.001)*vec3(abs(sin(2.0940)),abs(sin(4.1880)),abs(sin(6.2830)));
    lp=vec2(sin(time*0.6500+4.1880)*0.6500,cos(time*0.5500+2.0940)*0.5200); acc+=0.0015/max(length(uv-lp)-0.0900,0.001)*vec3(abs(sin(4.1880)),abs(sin(6.2820)),abs(sin(8.3770)));
    lp=vec2(sin(time*0.8000+6.2820)*0.6500,cos(time*0.6750+3.1410)*0.5200); acc+=0.0015/max(length(uv-lp)-0.0900,0.001)*vec3(abs(sin(6.2820)),abs(sin(8.3760)),abs(sin(10.4710)));
    lp=vec2(sin(time*0.9500+8.3760)*0.6500,cos(time*0.8000+4.1880)*0.5200); acc+=0.0015/max(length(uv-lp)-0.0900,0.001)*vec3(abs(sin(8.3760)),abs(sin(10.4700)),abs(sin(12.5650)));
    lp=vec2(sin(time*1.1000+10.4700)*0.6500,cos(time*0.9250+5.2350)*0.5200); acc+=0.0015/max(length(uv-lp)-0.0900,0.001)*vec3(abs(sin(10.4700)),abs(sin(12.5640)),abs(sin(14.6590)));
    lp=vec2(sin(time*1.2500+12.5640)*0.6500,cos(time*1.0500+6.2820)*0.5200); acc+=0.0015/max(length(uv-lp)-0.0900,0.001)*vec3(abs(sin(12.5640)),abs(sin(14.6580)),abs(sin(16.7530)));
    vec3 rgb=clamp(acc.bgr,0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}