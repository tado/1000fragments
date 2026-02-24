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
    vec2 flow_uv=st+vec2(0.0,-time*0.4500);
    flow_uv.x+=fbm(st*2.0+vec2(time*0.2000,0.0),3)*0.2500;
    float density=fbm(flow_uv*3.6000,5);
    density=smoothstep(0.25,0.75,density);
    vec3 rgb=vec3(density*2.0,density*0.8,density*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}