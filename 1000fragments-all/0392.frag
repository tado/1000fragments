uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.6087,0.7796))*16.4000-time*3.0000);
    v+=sin(length(st-vec2(0.2204,0.6087))*17.4000-time*3.2000);
    v+=sin(length(st-vec2(0.3913,0.2204))*18.4000-time*3.4000);
    v+=sin(length(st-vec2(0.7796,0.3913))*19.4000-time*3.6000);
    float n=v/4.0000*0.5+0.5;
    vec3 rgb=vec3(0.1,n*0.6,n);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}