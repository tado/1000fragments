uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec3 col;
    col.r=sin(uv.x*31.0000+time*92.0000+cos(uv.y*11.2000+time*13.2000)*0.5);
    col.g=sin(uv.x*27.9000-time*73.6000+cos(uv.y*14.4000+time*16.5000)*0.75);
    col.b=sin(uv.x*24.8000+time*44.0000+cos(uv.y*17.6000+time*19.8000));
    fragColor=TDOutputSwizzle(vec4(col*2.0000,1.0));
}