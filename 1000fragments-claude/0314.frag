uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float cx,cy,d=10.0;
    cx=sin(time*0.5000*7.0000+1.0460); cy=cos(time*0.5000*1.0000); d=min(d,length(uv-vec2(cx,cy)*0.7000));
    cx=sin(time*0.7000*7.0000+1.8310); cy=cos(time*0.7000*1.0000); d=min(d,length(uv-vec2(cx,cy)*0.6000));
    cx=sin(time*0.9000*7.0000+2.6160); cy=cos(time*0.9000*1.0000); d=min(d,length(uv-vec2(cx,cy)*0.5000));
    float v=smoothstep(0.0150,0.0,d);
    vec3 rgb=vec3(v*2.5,v*0.4,v*3.0);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}