uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.7476,0.6694))*12.2000-time*3.4000);
    v+=sin(length(st-vec2(0.2295,0.6297))*13.2000-time*3.6000);
    v+=sin(length(st-vec2(0.5229,0.2009))*14.2000-time*3.8000);
    float n=v/3.0000*0.5+0.5;
    vec3 rgb=vec3(n*1.8,n*0.7,0.1);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}