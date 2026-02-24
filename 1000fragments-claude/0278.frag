uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*37.0000+time*44.0000+cos(uv.y*7.8400+time*6.0000)*0.5);
    col.g=sin(uv.x*33.3000-time*35.2000+cos(uv.y*10.0800+time*7.5000)*0.75);
    col.b=sin(uv.x*29.6000+time*36.0000+cos(uv.y*12.3200+time*9.0000));
    fragColor=TDOutputSwizzle(vec4(col*2.0000,1.0));
}