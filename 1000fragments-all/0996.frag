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
    float col_id=floor(st.x*25.0000);
    float col_spd=1.0000*(0.5+random(vec2(col_id)));
    float drop=fract(st.y+time*col_spd);
    float brightness=exp(-drop*8.0);
    float gfreq=14.0000;
    float arc=noise(vec2(st.y*gfreq,time*2.0000+col_id*0.5))*0.2-0.1;
    float d=abs(st.x-col_id/25.0000-arc);
    vec3 rgb=vec3(0.05,brightness*1.5+0.0010/max(d,0.002),brightness*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}