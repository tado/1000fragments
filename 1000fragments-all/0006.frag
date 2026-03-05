uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.6865,0.7350))*15.0000-time*13.3000+0.0000);
    val+=sin(length(st-vec2(0.3135,0.2650))*15.0000-time*13.8000+1.0470);
    float v=val/2.0000*0.5+0.5;
    vec3 rgb=vec3(v*1.8,v*0.7,0.1);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}