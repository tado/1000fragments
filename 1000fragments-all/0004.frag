uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.7476,0.6694))*12.0000-time*9.7000+0.0000);
    val+=sin(length(st-vec2(0.4154,0.7878))*12.0000-time*10.2000+1.0470);
    val+=sin(length(st-vec2(0.2001,0.5085))*12.0000-time*10.7000+2.0940);
    val+=sin(length(st-vec2(0.3993,0.2174))*12.0000-time*11.2000+3.1410);
    val+=sin(length(st-vec2(0.7376,0.3169))*12.0000-time*11.7000+4.1880);
    float v=val/5.0000*0.5+0.5;
    vec3 rgb=vec3(v*2.5,v*0.4,v*3.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}