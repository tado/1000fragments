uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float angle=atan(uv.y,uv.x), radius=length(uv);
    float seg=6.28318/5.0000;
    angle=mod(angle+time*0.9000,seg);
    if(angle>seg*0.5) angle=seg-angle;
    uv=vec2(cos(angle),sin(angle))*radius;
float v=sin(length(uv)*6.0000-time*2.0)*0.5+0.5;
    vec3 rgb=clamp(vec3(v),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}