uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.7940,0.5596))*9.4000-time*1.8000);
    v+=sin(length(st-vec2(0.4404,0.7940))*10.4000-time*2.0000);
    v+=sin(length(st-vec2(0.2060,0.4404))*11.4000-time*2.2000);
    v+=sin(length(st-vec2(0.5596,0.2060))*12.4000-time*2.4000);
    float n=v/4.0000*0.5+0.5;
    vec3 rgb=vec3(0.1,n*0.6,n);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}