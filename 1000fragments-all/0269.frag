uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*23.5000+time*32.0000+cos(uv.y*15.4000+time*16.8000)*0.5);
    col.g=sin(uv.x*21.1500-time*25.6000+cos(uv.y*19.8000+time*21.0000)*0.75);
    col.b=sin(uv.x*18.8000+time*44.0000+cos(uv.y*24.2000+time*25.2000));
    fragColor=TDOutputSwizzle(vec4(col*1.5000,1.0));
}