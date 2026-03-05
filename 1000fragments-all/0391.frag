uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.6361,0.7674))*15.7000-time*2.6000);
    v+=sin(length(st-vec2(0.2004,0.4842))*16.7000-time*2.8000);
    v+=sin(length(st-vec2(0.6635,0.2485))*17.7000-time*3.0000);
    float n=v/3.0000*0.5+0.5;
    vec3 rgb=vec3(n,n*0.5,0.15);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}