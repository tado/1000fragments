uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.2288,0.6282))*33.0000-time*6.1000+0.0000);
    val+=sin(length(st-vec2(0.3718,0.2288))*33.0000-time*6.6000+1.0470);
    val+=sin(length(st-vec2(0.7712,0.3718))*33.0000-time*7.1000+2.0940);
    val+=sin(length(st-vec2(0.6282,0.7712))*33.0000-time*7.6000+3.1410);
    float v=val/4.0000*0.5+0.5;
    vec3 rgb=vec3(v*0.3,v*1.2,v*0.8);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}