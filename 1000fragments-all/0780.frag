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
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    float thickness=1.0000+noise(st*3.8000+time*0.1600)*2.0;
    vec3 wl=vec3(0.65,0.55,0.45);
    vec3 phase=2.0*3.14159*thickness/wl;
    vec3 color=cos(phase)*0.5+0.5;
    float fresnel=pow(1.0-abs(st.y-0.5)*2.0,2.0)*0.5+0.3;
    color*=fresnel;
    color=color;
    fragColor=TDOutputSwizzle(vec4(clamp(color,0.0,1.0),1.0));
}