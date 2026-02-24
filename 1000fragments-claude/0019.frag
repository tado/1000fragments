uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.2127,0.5862))*34.5000-time*7.9000+0.0000);
    val+=sin(length(st-vec2(0.3292,0.2534))*34.5000-time*8.4000+1.0470);
    val+=sin(length(st-vec2(0.6818,0.2613))*34.5000-time*8.9000+2.0940);
    val+=sin(length(st-vec2(0.7832,0.5991))*34.5000-time*9.4000+3.1410);
    val+=sin(length(st-vec2(0.4932,0.7999))*34.5000-time*9.9000+4.1880);
    float v=val/5.0000*0.5+0.5;
    vec3 rgb=vec3(v,0.1,1.0-v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}