uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*25.0000+time*44.0000+cos(uv.y*14.5600+time*20.4000)*0.5);
    col.g=sin(uv.x*22.5000-time*35.2000+cos(uv.y*18.7200+time*25.5000)*0.75);
    col.b=sin(uv.x*20.0000+time*12.0000+cos(uv.y*22.8800+time*30.6000));
    fragColor=TDOutputSwizzle(vec4(col*2.0000,1.0));
}