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
float fbm(vec2 st, int oct) {
    float v=0.0, a=0.5;
    for(int i=0;i<8;i++){if(i>=oct)break; v+=a*noise(st); st*=2.0; a*=0.5;}
    return v;
}
void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy; st.x*=resolution.x/resolution.y;
    vec2 p=st*3.2000;
    vec2 q=vec2(fbm(p+vec2(0.0000,0.0000),5),fbm(p+vec2(5.2000,1.3000),5));
    vec2 r=vec2(fbm(p+4.0*q+vec2(time*0.0500+2.4000,time*0.0250+9.5500),5),
                fbm(p+4.0*q+vec2(time*0.0350+8.8600,time*0.0150+3.0800),5));
    float f=fbm(p+4.0*r,5);
    vec3 rgb=vec3(0.05,clamp(f,0.0,1.0)*1.5,clamp(f,0.0,1.0)*0.3);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}