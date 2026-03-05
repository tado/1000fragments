uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float cx,cy,d=10.0;
    cx=sin(time*0.5000*4.0000+1.5690); cy=cos(time*0.5000*6.0000); d=min(d,length(uv-vec2(cx,cy)*0.7000));
    cx=sin(time*0.7000*4.0000+2.3540); cy=cos(time*0.7000*6.0000); d=min(d,length(uv-vec2(cx,cy)*0.6000));
    cx=sin(time*0.9000*4.0000+3.1390); cy=cos(time*0.9000*6.0000); d=min(d,length(uv-vec2(cx,cy)*0.5000));
    cx=sin(time*1.1000*4.0000+3.9240); cy=cos(time*1.1000*6.0000); d=min(d,length(uv-vec2(cx,cy)*0.4000));
    float v=smoothstep(0.0120,0.0,d);
    vec3 rgb=vec3(abs(sin(v*3.14159)),abs(sin(v*3.14159+2.094)),abs(sin(v*3.14159+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}