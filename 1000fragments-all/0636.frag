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
    float v=0.0, bx;
    bx=-0.2000+noise(vec2(st.y*12.0000,time*9.0000+0.0000))*0.1500-0.075; v+=clamp(0.0110/abs(st.x-bx),0.0,1.5);
    vec3 rgb=clamp(vec3(v,v*0.6,v*2.0),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}