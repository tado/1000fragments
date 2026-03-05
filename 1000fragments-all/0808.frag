uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), v=0.0;
    v+=sin(r*16.0000-time*9.5000+0.0000)*1.0000;
    v+=sin(r*19.0000-time*9.9000+0.7850)*0.5000;
    v+=sin(r*22.0000-time*10.3000+1.5700)*0.3333;
    v+=sin(r*25.0000-time*10.7000+2.3550)*0.2500;
    v+=sin(r*28.0000-time*11.1000+3.1400)*0.2000;
    v+=sin(r*31.0000-time*11.5000+3.9250)*0.1667;
    float n=v/2.4500;
    n=n*0.5+0.5;
    vec3 rgb=vec3(0.05,n*1.5,n*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}