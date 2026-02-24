uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.6865,0.7350))*14.3000-time*1.8000);
    v+=sin(length(st-vec2(0.3897,0.7790))*15.3000-time*2.0000);
    v+=sin(length(st-vec2(0.2032,0.5440))*16.3000-time*2.2000);
    v+=sin(length(st-vec2(0.3135,0.2650))*17.3000-time*2.4000);
    v+=sin(length(st-vec2(0.6103,0.2210))*18.3000-time*2.6000);
    v+=sin(length(st-vec2(0.7968,0.4560))*19.3000-time*2.8000);
    float n=v/6.0000*0.5+0.5;
    vec3 rgb=vec3(n,0.1,1.0-n);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}