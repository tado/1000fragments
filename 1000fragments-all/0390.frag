uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    v+=sin(length(st-vec2(0.6621,0.7524))*15.0000-time*2.2000);
    v+=sin(length(st-vec2(0.3379,0.2476))*16.0000-time*2.4000);
    float n=v/2.0000*0.5+0.5;
    vec3 rgb=vec3(n);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}