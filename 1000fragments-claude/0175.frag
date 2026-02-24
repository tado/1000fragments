uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 rot2d(vec2 v,float a){return vec2(v.x*cos(a)-v.y*sin(a),v.x*sin(a)+v.y*cos(a));}
void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy*2.0-1.0;
    float d=2.5000, spd=0.4000;
    vec2 vr=rot2d(uv,radians(time*23.0000)), vg=rot2d(uv,radians(time*10.5000)), vb=rot2d(uv,radians(time*-20.0000));
    float r=mod(vr.x+mod(time/d*spd,1.0),1.0/d)*d;
    float g=mod(vg.y+mod(time/d*spd,1.0),1.0/d)*d;
    float b=mod(vb.x-mod(time/d*spd,1.0),1.0/d)*d;
    fragColor=TDOutputSwizzle(vec4(r,g,b,1.0));
}