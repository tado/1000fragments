uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*20.5000+time*104.0000+cos(uv.y*17.0800+time*9.6000)*0.5);
    col.g=sin(uv.x*18.4500-time*83.2000+cos(uv.y*21.9600+time*12.0000)*0.75);
    col.b=sin(uv.x*16.4000+time*28.0000+cos(uv.y*26.8400+time*14.4000));
    fragColor=TDOutputSwizzle(vec4(col*2.5000,1.0));
}