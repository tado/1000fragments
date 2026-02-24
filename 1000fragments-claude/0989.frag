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
    float thickness=1.5+noise(st*2.5+time*0.08)*2.0;
    vec3 wl=vec3(0.65,0.55,0.45);
    vec3 ph=2.0*3.14159*thickness/wl;
    vec3 iridescent=cos(ph)*0.5+0.5;
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float r=length(uv), ang=atan(uv.y,uv.x)+time*0.8000;
    float spiral=mod(ang*5.0000/6.28318+r*4.0000,1.0);
    float v=smoothstep(0.06,0.0,abs(spiral-0.5)-0.02)*smoothstep(1.2,0.3,r);
    vec3 rgb=mix(iridescent*0.4,iridescent*1.5+vec3(v),v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}