uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), v=0.0;
    v+=sin(r*20.0000-time*3.5000+0.0000)*1.0000;
    v+=sin(r*23.0000-time*3.9000+0.7850)*0.5000;
    v+=sin(r*26.0000-time*4.3000+1.5700)*0.3333;
    v+=sin(r*29.0000-time*4.7000+2.3550)*0.2500;
    v+=sin(r*32.0000-time*5.1000+3.1400)*0.2000;
    v+=sin(r*35.0000-time*5.5000+3.9250)*0.1667;
    v+=sin(r*38.0000-time*5.9000+4.7100)*0.1429;
    v+=sin(r*41.0000-time*6.3000+5.4950)*0.1250;
    v+=sin(r*44.0000-time*6.7000+6.2800)*0.1111;
    float n=v/2.8290;
    n=n*0.5+0.5;
    vec3 rgb=vec3(abs(sin(n*3.14159)),abs(sin(n*3.14159+2.094)),abs(sin(n*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}