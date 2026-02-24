uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.5212,0.7992))*18.5000-time*1.4000);
    v+=sin(length(st-vec2(0.4788,0.2008))*19.5000-time*1.6000);
    float n=v/2.0000*0.5+0.5;
    vec3 rgb=vec3(1.0-n*0.9,n*0.2,n);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}