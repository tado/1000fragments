uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.5657,0.7927))*19.5000-time*4.3000+0.0000);
    val+=sin(length(st-vec2(0.2419,0.6529))*19.5000-time*4.8000+1.0470);
    val+=sin(length(st-vec2(0.2748,0.3018))*19.5000-time*5.3000+2.0940);
    val+=sin(length(st-vec2(0.6189,0.2246))*19.5000-time*5.8000+3.1410);
    val+=sin(length(st-vec2(0.7987,0.5280))*19.5000-time*6.3000+4.1880);
    float v=val/5.0000*0.5+0.5;
    vec3 rgb=vec3(v,0.1,1.0-v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}