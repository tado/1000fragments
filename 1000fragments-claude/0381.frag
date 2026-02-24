uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.7985,0.5300))*8.7000-time*1.4000);
    v+=sin(length(st-vec2(0.3248,0.7435))*9.7000-time*1.6000);
    v+=sin(length(st-vec2(0.3767,0.2265))*10.7000-time*1.8000);
    float n=v/3.0000*0.5+0.5;
    vec3 rgb=vec3(n,n*0.5,0.15);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}