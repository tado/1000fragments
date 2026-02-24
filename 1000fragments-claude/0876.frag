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
    vec2 st=gl_FragCoord.xy/resolution.xy;
    vec2 mass=vec2(0.5+sin(time*0.9000)*0.15,0.5+cos(time*0.7200)*0.12);
    vec2 dir=st-mass; float d=length(dir)+0.001;
    vec2 distorted=st+normalize(dir)*0.1000/d;
    float v=fbm(distorted*3.0+time*0.1,4);
    vec3 rgb=vec3(clamp(v,0.0,1.0)*2.5,clamp(v,0.0,1.0)*0.4,clamp(v,0.0,1.0)*3.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}