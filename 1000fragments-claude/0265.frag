uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*17.5000+time*80.0000+cos(uv.y*18.7600+time*24.0000)*0.5);
    col.g=sin(uv.x*15.7500-time*64.0000+cos(uv.y*24.1200+time*30.0000)*0.75);
    col.b=sin(uv.x*14.0000+time*12.0000+cos(uv.y*29.4800+time*36.0000));
    fragColor=TDOutputSwizzle(vec4(col*1.5000,1.0));
}