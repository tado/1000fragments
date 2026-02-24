uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec2 center=uv-0.5; float d=length(center);
    vec2 dir=center*0.0800*(1.0+d*d*3.0);
    float spd=1.7000;
    float r=sin((uv+dir*1.0).x*8.0+time*spd)*sin((uv+dir*1.0).y*6.0+time*spd)*0.5+0.5;
    float g=sin(uv.x*8.0+time*spd)*sin(uv.y*6.0+time*spd)*0.5+0.5;
    float b=sin((uv-dir*1.0).x*8.0+time*spd)*sin((uv-dir*1.0).y*6.0+time*spd)*0.5+0.5;
    float vign=1.0-d*1.5;
    vec3 rgb=vec3(r,g,b)*vign;
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}