uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy-0.5; st.x*=resolution.x/resolution.y;
    float d=length(st);
    vec3 rgb=clamp(vec3(abs(sin(d*16.0000-time*3.0000)),abs(cos(d*20.8000-time*2.1000)),0.5),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}