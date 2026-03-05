uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), v=0.0;
    v+=sin(r*8.0000-time*8.0000+0.0000)*1.0000;
    v+=sin(r*11.0000-time*8.4000+0.7850)*0.5000;
    v+=sin(r*14.0000-time*8.8000+1.5700)*0.3333;
    v+=sin(r*17.0000-time*9.2000+2.3550)*0.2500;
    v+=sin(r*20.0000-time*9.6000+3.1400)*0.2000;
    v+=sin(r*23.0000-time*10.0000+3.9250)*0.1667;
    float n=v/2.4500;
    n=n*0.5+0.5;
    vec3 rgb=vec3(n);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}