uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*13.0000+time*44.0000+cos(uv.y*21.2800+time*13.2000)*0.5);
    col.g=sin(uv.x*11.7000-time*35.2000+cos(uv.y*27.3600+time*16.5000)*0.75);
    col.b=sin(uv.x*10.4000+time*28.0000+cos(uv.y*33.4400+time*19.8000));
    fragColor=TDOutputSwizzle(vec4(col*2.0000,1.0));
}