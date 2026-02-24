uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float t=sin(time*1.2000)*0.5+0.5;
    float d=mix(length(uv)-0.5, abs(sin(atan(uv.y,uv.x)*2)*0.4+length(uv))-0.5, t);
    float outline=smoothstep(0.0840,0.0,abs(d));
    float fill=smoothstep(0.0,-0.02,d)*0.3;
    float v=outline+fill;
    vec3 rgb=vec3(clamp(v,0.0,1.0)*2.5,clamp(v,0.0,1.0)*0.4,clamp(v,0.0,1.0)*3.0);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}