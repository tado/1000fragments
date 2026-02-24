uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    vec2 mass=vec2(0.5+sin(time*0.6000)*0.15,0.5+cos(time*0.4800)*0.12);
    vec2 dir=st-mass; float d=length(dir)+0.001;
    vec2 distorted=st+normalize(dir)*0.0600/d;
    float v=abs(sin(length(distorted-0.5)*15.0-time*2.0));
    vec3 rgb=vec3(0.1,clamp(v,0.0,1.0)*0.6,clamp(v,0.0,1.0));
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}