uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.2510,0.6673))*31.5000-time*4.3000+0.0000);
    val+=sin(length(st-vec2(0.4796,0.2007))*31.5000-time*4.8000+1.0470);
    val+=sin(length(st-vec2(0.7694,0.6320))*31.5000-time*5.3000+2.0940);
    float v=val/3.0000*0.5+0.5;
    vec3 rgb=vec3(0.05,v*1.5,v*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}