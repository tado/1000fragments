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
    float a=0.3000;
    vec2 rot=vec2(st.x*cos(a)-st.y*sin(a),st.x*sin(a)+st.y*cos(a));
    vec2 cell=floor(rot*60.0000), frac=fract(rot*60.0000)-0.5;
    float base=random(cell*0.1+floor(time*0.1300)/0.1300+cell*0.01);
    float dot=step(length(frac),base*0.48);
    vec3 rgb=vec3(dot);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}