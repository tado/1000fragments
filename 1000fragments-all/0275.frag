uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*32.5000+time*104.0000+cos(uv.y*10.3600+time*16.8000)*0.5);
    col.g=sin(uv.x*29.2500-time*83.2000+cos(uv.y*13.3200+time*21.0000)*0.75);
    col.b=sin(uv.x*26.0000+time*12.0000+cos(uv.y*16.2800+time*25.2000));
    fragColor=TDOutputSwizzle(vec4(col*2.5000,1.0));
}