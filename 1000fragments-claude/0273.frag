uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*29.5000+time*80.0000+cos(uv.y*12.0400+time*9.6000)*0.5);
    col.g=sin(uv.x*26.5500-time*64.0000+cos(uv.y*15.4800+time*12.0000)*0.75);
    col.b=sin(uv.x*23.6000+time*36.0000+cos(uv.y*18.9200+time*14.4000));
    fragColor=TDOutputSwizzle(vec4(col*1.5000,1.0));
}