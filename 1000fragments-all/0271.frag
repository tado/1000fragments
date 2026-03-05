uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*26.5000+time*56.0000+cos(uv.y*13.7200+time*24.0000)*0.5);
    col.g=sin(uv.x*23.8500-time*44.8000+cos(uv.y*17.6400+time*30.0000)*0.75);
    col.b=sin(uv.x*21.2000+time*20.0000+cos(uv.y*21.5600+time*36.0000));
    fragColor=TDOutputSwizzle(vec4(col*2.5000,1.0));
}