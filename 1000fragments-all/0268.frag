uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*22.0000+time*20.0000+cos(uv.y*16.2400+time*13.2000)*0.5);
    col.g=sin(uv.x*19.8000-time*16.0000+cos(uv.y*20.8800+time*16.5000)*0.75);
    col.b=sin(uv.x*17.6000+time*36.0000+cos(uv.y*25.5200+time*19.8000));
    fragColor=TDOutputSwizzle(vec4(col*1.0000,1.0));
}