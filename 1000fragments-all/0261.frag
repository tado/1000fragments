uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*11.5000+time*32.0000+cos(uv.y*22.1200+time*9.6000)*0.5);
    col.g=sin(uv.x*10.3500-time*25.6000+cos(uv.y*28.4400+time*12.0000)*0.75);
    col.b=sin(uv.x*9.2000+time*20.0000+cos(uv.y*34.7600+time*14.4000));
    fragColor=TDOutputSwizzle(vec4(col*1.5000,1.0));
}