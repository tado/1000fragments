uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float y0, y1, v=0.0;
    y0=sin(st.x*12.5600+time*3.4000)*0.1200+0.3600; v+=smoothstep(0.0030,0.0,abs(st.y-y0));
    y1=sin(st.x*25.1200+time*4.4200)*0.1600+0.5100; v+=smoothstep(0.0030,0.0,abs(st.y-y1));
    vec3 rgb=vec3(0.0)+vec3(v,v*0.5,0.0)*clamp(v,0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}