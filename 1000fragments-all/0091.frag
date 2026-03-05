uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy-0.5; st.x*=resolution.x/resolution.y;
    float d=length(st);
    vec3 rgb=clamp(vec3(sin(d*19.0000-time*7.5000)*0.5+0.5,sin(d*27.5500-time*8.2500)*0.5+0.5,sin(d*36.1000-time*9.0000)*0.5+0.5),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}