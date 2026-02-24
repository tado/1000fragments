uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    vec2 mass=vec2(0.5+sin(time*0.7500)*0.15,0.5+cos(time*0.6000)*0.12);
    vec2 dir=st-mass; float d=length(dir)+0.001;
    vec2 distorted=st+normalize(dir)*0.0400/d;
    float v=length(fract(distorted*5.0)-0.5)*2.0;
    vec3 rgb=vec3(abs(sin(clamp(v,0.0,1.0)*3.14159)),abs(sin(clamp(v,0.0,1.0)*3.14159+2.094)),abs(sin(clamp(v,0.0,1.0)*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}