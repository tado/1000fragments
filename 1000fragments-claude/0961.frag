uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float spd=1.7000;
    float signal=sin(st.x*6.28318*3.0+time*spd)*0.5+0.5;
    float scanline=sin(st.y*400.0000*3.14159)*0.5+0.5;
    scanline=pow(scanline,2.1000);
    signal*=scanline*1.5000;
    float vignette=(1.0-pow(abs(st.x-0.5)*2.0,3.0))*(1.0-pow(abs(st.y-0.5)*2.0,3.0));
    signal*=vignette;
    vec3 rgb=vec3(signal,signal*1.1,signal*0.8);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}