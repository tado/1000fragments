uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.3485,0.7590))*27.0000-time*13.3000+0.0000);
    val+=sin(length(st-vec2(0.2069,0.4360))*27.0000-time*13.8000+1.0470);
    val+=sin(length(st-vec2(0.4703,0.2015))*27.0000-time*14.3000+2.0940);
    val+=sin(length(st-vec2(0.7747,0.3795))*27.0000-time*14.8000+3.1410);
    val+=sin(length(st-vec2(0.6995,0.7241))*27.0000-time*15.3000+4.1880);
    float v=val/5.0000*0.5+0.5;
    vec3 rgb=vec3(v*2.5,v*0.4,v*3.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}