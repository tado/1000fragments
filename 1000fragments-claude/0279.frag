uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*38.5000+time*56.0000+cos(uv.y*7.0000+time*9.6000)*0.5);
    col.g=sin(uv.x*34.6500-time*44.8000+cos(uv.y*9.0000+time*12.0000)*0.75);
    col.b=sin(uv.x*30.8000+time*44.0000+cos(uv.y*11.0000+time*14.4000));
    fragColor=TDOutputSwizzle(vec4(col*2.5000,1.0));
}