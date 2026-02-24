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
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec2 center=uv-0.5; float d=length(center);
    vec2 dir=center*0.0200*(1.0+d*d*3.0);
    float spd=1.4000;
    float r=fbm((uv+dir*1.0)*3.0+time*0.1,4);
    float g=fbm(uv*3.0+time*0.1,4);
    float b=fbm((uv-dir*1.0)*3.0+time*0.1,4);
    float vign=1.0-d*1.5;
    vec3 rgb=vec3(r,g,b)*vign;
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}