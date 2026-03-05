uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.7866,0.5887))*10.1000-time*2.2000);
    v+=sin(length(st-vec2(0.5042,0.8000))*11.1000-time*2.4000);
    v+=sin(length(st-vec2(0.2160,0.5967))*12.1000-time*2.6000);
    v+=sin(length(st-vec2(0.3202,0.2598))*13.1000-time*2.8000);
    v+=sin(length(st-vec2(0.6729,0.2548))*14.1000-time*3.0000);
    float n=v/5.0000*0.5+0.5;
    vec3 rgb=vec3(abs(sin(n*3.14159)),abs(sin(n*3.14159+2.094)),abs(sin(n*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}