uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.4318,0.7922))*24.0000-time*9.7000+0.0000);
    val+=sin(length(st-vec2(0.2811,0.2949))*24.0000-time*10.2000+1.0470);
    val+=sin(length(st-vec2(0.7871,0.4130))*24.0000-time*10.7000+2.0940);
    float v=val/3.0000*0.5+0.5;
    vec3 rgb=vec3(0.1,v*0.6,v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}