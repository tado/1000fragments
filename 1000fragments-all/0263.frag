uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*14.5000+time*56.0000+cos(uv.y*20.4400+time*16.8000)*0.5);
    col.g=sin(uv.x*13.0500-time*44.8000+cos(uv.y*26.2800+time*21.0000)*0.75);
    col.b=sin(uv.x*11.6000+time*36.0000+cos(uv.y*32.1200+time*25.2000));
    fragColor=TDOutputSwizzle(vec4(col*2.5000,1.0));
}