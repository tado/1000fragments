uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*16.0000+time*68.0000+cos(uv.y*19.6000+time*20.4000)*0.5);
    col.g=sin(uv.x*14.4000-time*54.4000+cos(uv.y*25.2000+time*25.5000)*0.75);
    col.b=sin(uv.x*12.8000+time*44.0000+cos(uv.y*30.8000+time*30.6000));
    fragColor=TDOutputSwizzle(vec4(col*1.0000,1.0));
}