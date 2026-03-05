uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy-0.5; st.x*=resolution.x/resolution.y;
    float d=length(st);
    vec3 rgb=clamp(vec3(sin(d*14.0000-time*12.0000)*0.5+0.5,sin(d*14.7000-time*13.2000)*0.5+0.5,sin(d*15.4000-time*14.4000)*0.5+0.5),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}