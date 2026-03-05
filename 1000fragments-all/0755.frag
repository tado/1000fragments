uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float t=sin(time*0.8000)*0.5+0.5;
    float d=mix(max(abs(uv.x),abs(uv.y))-0.5, dot(uv,normalize(vec2(0,1)))+0.5, t);
    float outline=smoothstep(0.0520,0.0,abs(d));
    float fill=smoothstep(0.0,-0.02,d)*0.3;
    float v=outline+fill;
    vec3 rgb=vec3(0.1,clamp(v,0.0,1.0)*0.6,clamp(v,0.0,1.0));
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}