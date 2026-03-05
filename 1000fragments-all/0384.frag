uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.7763,0.6168))*10.8000-time*2.6000);
    v+=sin(length(st-vec2(0.5370,0.7977))*11.8000-time*2.8000);
    v+=sin(length(st-vec2(0.2607,0.6809))*12.8000-time*3.0000);
    v+=sin(length(st-vec2(0.2237,0.3832))*13.8000-time*3.2000);
    v+=sin(length(st-vec2(0.4630,0.2023))*14.8000-time*3.4000);
    v+=sin(length(st-vec2(0.7393,0.3191))*15.8000-time*3.6000);
    float n=v/6.0000*0.5+0.5;
    vec3 rgb=vec3(n*2.5,n*0.4,n*3.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}