uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*35.5000+time*32.0000+cos(uv.y*8.6800+time*24.0000)*0.5);
    col.g=sin(uv.x*31.9500-time*25.6000+cos(uv.y*11.1600+time*30.0000)*0.75);
    col.b=sin(uv.x*28.4000+time*28.0000+cos(uv.y*13.6400+time*36.0000));
    fragColor=TDOutputSwizzle(vec4(col*1.5000,1.0));
}