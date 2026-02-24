uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.7090,0.7152))*13.6000-time*1.4000);
    v+=sin(length(st-vec2(0.3599,0.7653))*14.6000-time*1.6000);
    v+=sin(length(st-vec2(0.2044,0.4487))*15.6000-time*1.8000);
    v+=sin(length(st-vec2(0.4574,0.2030))*16.6000-time*2.0000);
    v+=sin(length(st-vec2(0.7693,0.3677))*17.6000-time*2.2000);
    float n=v/5.0000*0.5+0.5;
    vec3 rgb=vec3(n*0.3,n*1.2,n*0.8);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}