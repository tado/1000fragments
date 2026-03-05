uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.7866,0.5887))*9.0000-time*6.1000+0.0000);
    val+=sin(length(st-vec2(0.2799,0.7039))*9.0000-time*6.6000+1.0470);
    val+=sin(length(st-vec2(0.4335,0.2075))*9.0000-time*7.1000+2.0940);
    float v=val/3.0000*0.5+0.5;
    vec3 rgb=vec3(0.1,v*0.6,v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}