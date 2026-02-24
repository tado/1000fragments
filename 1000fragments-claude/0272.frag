uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*28.0000+time*68.0000+cos(uv.y*12.8800+time*6.0000)*0.5);
    col.g=sin(uv.x*25.2000-time*54.4000+cos(uv.y*16.5600+time*7.5000)*0.75);
    col.b=sin(uv.x*22.4000+time*28.0000+cos(uv.y*20.2400+time*9.0000));
    fragColor=TDOutputSwizzle(vec4(col*1.0000,1.0));
}