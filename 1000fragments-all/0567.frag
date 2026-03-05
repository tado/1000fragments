uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec2 center=uv-0.5; float d=length(center);
    vec2 dir=center*0.0350*(1.0+d*d*3.0);
    float spd=1.1000;
    float r=sin(length((uv+dir*1.0)-0.5)*20.0-time*3.0)*0.5+0.5;
    float g=sin(length(uv-0.5)*20.0-time*3.0)*0.5+0.5;
    float b=sin(length((uv-dir*1.0)-0.5)*20.0-time*3.0)*0.5+0.5;
    float vign=1.0-d*1.5;
    vec3 rgb=vec3(r,g,b)*vign;
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}