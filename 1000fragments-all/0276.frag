uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*34.0000+time*20.0000+cos(uv.y*9.5200+time*20.4000)*0.5);
    col.g=sin(uv.x*30.6000-time*16.0000+cos(uv.y*12.2400+time*25.5000)*0.75);
    col.b=sin(uv.x*27.2000+time*20.0000+cos(uv.y*14.9600+time*30.6000));
    fragColor=TDOutputSwizzle(vec4(col*1.0000,1.0));
}