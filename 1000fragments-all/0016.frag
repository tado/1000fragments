uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float val=0.0;
    val+=sin(length(st-vec2(0.2788,0.7026))*30.0000-time*2.5000+0.0000);
    val+=sin(length(st-vec2(0.7212,0.2974))*30.0000-time*3.0000+1.0470);
    float v=val/2.0000*0.5+0.5;
    vec3 rgb=vec3(v*1.8,v*0.7,0.1);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}