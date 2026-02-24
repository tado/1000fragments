uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
float noise(vec2 st) {
    vec2 i=floor(st), f=fract(st);
    float a=random(i), b=random(i+vec2(1,0)), c=random(i+vec2(0,1)), d=random(i+vec2(1,1));
    vec2 u=f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
}
void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float spd=0.9000;
    float signal=noise(vec2(st.x*5.0,time*spd*0.2));
    float scanline=sin(st.y*250.0000*3.14159)*0.5+0.5;
    scanline=pow(scanline,1.8000);
    signal*=scanline*1.3000;
    float vignette=(1.0-pow(abs(st.x-0.5)*2.0,3.0))*(1.0-pow(abs(st.y-0.5)*2.0,3.0));
    signal*=vignette;
    vec3 rgb=vec3(signal*0.3,signal,signal*0.4);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}