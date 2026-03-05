uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.7295,0.6933))*12.9000-time*1.0000);
    v+=sin(length(st-vec2(0.3067,0.7295))*13.9000-time*1.2000);
    v+=sin(length(st-vec2(0.2705,0.3067))*14.9000-time*1.4000);
    v+=sin(length(st-vec2(0.6933,0.2705))*15.9000-time*1.6000);
    float n=v/4.0000*0.5+0.5;
    vec3 rgb=vec3(0.05,n*1.5,n*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}