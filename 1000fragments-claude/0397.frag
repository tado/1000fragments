uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.4613,0.7975))*19.9000-time*2.2000);
    v+=sin(length(st-vec2(0.2025,0.4613))*20.9000-time*2.4000);
    v+=sin(length(st-vec2(0.5387,0.2025))*21.9000-time*2.6000);
    v+=sin(length(st-vec2(0.7975,0.5387))*22.9000-time*2.8000);
    float n=v/4.0000*0.5+0.5;
    vec3 rgb=vec3(0.05,n*1.5,n*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}