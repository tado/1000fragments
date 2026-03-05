uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float t=sin(time*1.0000)*0.5+0.5;
    float d=mix(length(uv)-0.5, abs(uv.x)+abs(uv.y)-0.6, t);
    float outline=smoothstep(0.0360,0.0,abs(d));
    float fill=smoothstep(0.0,-0.02,d)*0.3;
    float v=outline+fill;
    vec3 rgb=vec3(abs(sin(clamp(v,0.0,1.0)*3.14159)),abs(sin(clamp(v,0.0,1.0)*3.14159+2.094)),abs(sin(clamp(v,0.0,1.0)*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}