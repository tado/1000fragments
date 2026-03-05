uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy-0.5; st.x*=resolution.x/resolution.y;
    float d=length(st);
    vec3 rgb=clamp(vec3(sin(d*9.0000-time*4.5000)*0.5+0.5,sin(d*10.1700-time*4.9500)*0.5+0.5,sin(d*11.3400-time*5.4000)*0.5+0.5),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}