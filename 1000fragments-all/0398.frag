uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.4318,0.7922))*20.6000-time*2.6000);
    v+=sin(length(st-vec2(0.2011,0.5255))*21.6000-time*2.8000);
    v+=sin(length(st-vec2(0.3834,0.2236))*22.6000-time*3.0000);
    v+=sin(length(st-vec2(0.7269,0.3037))*23.6000-time*3.2000);
    v+=sin(length(st-vec2(0.7568,0.6551))*24.6000-time*3.4000);
    float n=v/5.0000*0.5+0.5;
    vec3 rgb=vec3(n*0.3,n*1.2,n*0.8);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}