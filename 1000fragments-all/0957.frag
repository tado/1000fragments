uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float spd=2.1000;
    float signal=abs(sin(st.x*20.0+time*spd))*0.7;
    float scanline=sin(st.y*200.0000*3.14159)*0.5+0.5;
    scanline=pow(scanline,2.1000);
    signal*=scanline*1.5000;
    float vignette=(1.0-pow(abs(st.x-0.5)*2.0,3.0))*(1.0-pow(abs(st.y-0.5)*2.0,3.0));
    signal*=vignette;
    vec3 rgb=vec3(signal,signal*0.4,signal*0.2);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}