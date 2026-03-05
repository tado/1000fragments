uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*19.0000+time*92.0000+cos(uv.y*17.9200+time*6.0000)*0.5);
    col.g=sin(uv.x*17.1000-time*73.6000+cos(uv.y*23.0400+time*7.5000)*0.75);
    col.b=sin(uv.x*15.2000+time*20.0000+cos(uv.y*28.1600+time*9.0000));
    fragColor=TDOutputSwizzle(vec4(col*2.0000,1.0));
}