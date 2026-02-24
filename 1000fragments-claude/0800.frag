uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), v=0.0;
    v+=sin(r*24.0000-time*6.5000+0.0000)*1.0000;
    v+=sin(r*27.0000-time*6.9000+0.7850)*0.5000;
    v+=sin(r*30.0000-time*7.3000+1.5700)*0.3333;
    v+=sin(r*33.0000-time*7.7000+2.3550)*0.2500;
    v+=sin(r*36.0000-time*8.1000+3.1400)*0.2000;
    float n=v/2.2833;
    n=n*0.5+0.5;
    vec3 rgb=vec3(n,0.1,1.0-n);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}