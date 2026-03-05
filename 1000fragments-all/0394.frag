uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.5510,0.7956))*17.8000-time*1.0000);
    v+=sin(length(st-vec2(0.2695,0.6920))*18.8000-time*1.2000);
    v+=sin(length(st-vec2(0.2185,0.3963))*19.8000-time*1.4000);
    v+=sin(length(st-vec2(0.4490,0.2044))*20.8000-time*1.6000);
    v+=sin(length(st-vec2(0.7305,0.3080))*21.8000-time*1.8000);
    v+=sin(length(st-vec2(0.7815,0.6037))*22.8000-time*2.0000);
    float n=v/6.0000*0.5+0.5;
    vec3 rgb=vec3(n*2.5,n*0.4,n*3.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}