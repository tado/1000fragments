uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.5802,0.7891))*17.1000-time*3.4000);
    v+=sin(length(st-vec2(0.2499,0.6656))*18.1000-time*3.6000);
    v+=sin(length(st-vec2(0.2652,0.3133))*19.1000-time*3.8000);
    v+=sin(length(st-vec2(0.6050,0.2190))*20.1000-time*4.0000);
    v+=sin(length(st-vec2(0.7997,0.5130))*21.1000-time*4.2000);
    float n=v/5.0000*0.5+0.5;
    vec3 rgb=vec3(abs(sin(n*3.14159)),abs(sin(n*3.14159+2.094)),abs(sin(n*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}