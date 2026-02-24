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
    float h=fbm(st*2.8000+vec2(time*0.0400,time*0.0280),6);
    float contour=abs(sin(h*32.0000*3.14159));
    contour=smoothstep(0.05,0.0,contour)*1.5+h*0.4;
    float v=clamp(contour,0.0,1.0);
    vec3 rgb=vec3(v*0.5,v*0.1,v*0.8);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}