uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.6493,0.7602))*16.5000-time*15.1000+0.0000);
    val+=sin(length(st-vec2(0.2000,0.4992))*16.5000-time*15.6000+1.0470);
    val+=sin(length(st-vec2(0.6507,0.2406))*16.5000-time*16.1000+2.0940);
    float v=val/3.0000*0.5+0.5;
    vec3 rgb=vec3(0.05,v*1.5,v*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}