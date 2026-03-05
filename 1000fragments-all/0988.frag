uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 z=uv*1.8; float crv=0.28*cos(time*0.2), civ=0.28*sin(time*0.15);
    int iter=0;
    for(int i=0;i<32;i++){if(dot(z,z)>4.0)break; z=vec2(z.x*z.x-z.y*z.y+crv,2.0*z.x*z.y+civ); iter++;}
    float t=float(iter)/32.0;
    float ang=atan(uv.y,uv.x)+time*0.6000;
    float seg=6.28318/5.0000; ang=mod(ang,seg); if(ang>seg*0.5) ang=seg-ang;
    float sym=abs(cos(ang*5.0000));
    float v=mix(t,sym,0.3);
    vec3 rgb=vec3(abs(sin(v*3.14)),abs(sin(v*3.14+2.094)),abs(sin(v*3.14+4.189)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}