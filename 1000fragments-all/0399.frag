uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.4030,0.7839))*21.3000-time*3.0000);
    v+=sin(length(st-vec2(0.2057,0.5580))*22.3000-time*3.2000);
    v+=sin(length(st-vec2(0.3026,0.2741))*23.3000-time*3.4000);
    v+=sin(length(st-vec2(0.5970,0.2161))*24.3000-time*3.6000);
    v+=sin(length(st-vec2(0.7943,0.4420))*25.3000-time*3.8000);
    v+=sin(length(st-vec2(0.6974,0.7259))*26.3000-time*4.0000);
    float n=v/6.0000*0.5+0.5;
    vec3 rgb=vec3(n,0.1,1.0-n);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}