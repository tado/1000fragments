uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.6087,0.7796))*18.0000-time*2.5000+0.0000);
    val+=sin(length(st-vec2(0.2204,0.6087))*18.0000-time*3.0000+1.0470);
    val+=sin(length(st-vec2(0.3913,0.2204))*18.0000-time*3.5000+2.0940);
    val+=sin(length(st-vec2(0.7796,0.3913))*18.0000-time*4.0000+3.1410);
    float v=val/4.0000*0.5+0.5;
    vec3 rgb=vec3(v*0.3,v*1.2,v*0.8);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}