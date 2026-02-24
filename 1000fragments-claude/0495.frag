uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 rot2d(vec2 v,float a){return vec2(v.x*cos(a)-v.y*sin(a),v.x*sin(a)+v.y*cos(a));}
void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec2 r2=rot2d(uv*2.0-1.0,time*1.4000);
    float g=mod(r2.x*6.0+time,1.0)*mod(r2.y*6.0-time,1.0);
    float s=sin(uv.x*27.0000+time*20.0)*sin(uv.y*24.3000+time*15.0)*0.5+0.5;
    float v=g*0.4+s*0.6;
    vec3 rgb=vec3(1.0-v*0.9,v*0.2,v);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}