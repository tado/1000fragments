uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy-0.5; st.x*=resolution.x/resolution.y;
    float d=length(st);
    vec3 rgb=clamp(vec3(mod(d*20.0000-time*9.0000,1.0)),0.0,1.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}