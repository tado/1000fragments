uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec3 ro=vec3(0.0,0.0,-3.0), rd=normalize(vec3(uv,1.4));
    vec3 sc=vec3(sin(time*1.2000)*0.4,cos(time*0.8400)*0.3,0.0);
    vec3 oc=ro-sc; float b=dot(oc,rd), c=dot(oc,oc)-1.0, disc=b*b-c;
    vec3 rgb=vec3(0.0);
    if(disc>0.0){
        float t=-b-sqrt(disc); vec3 hit=ro+rd*t, n=normalize(hit-sc);
        vec3 li=normalize(vec3(cos(time*0.7200),sin(time*0.6000),-1.2000));
        float diff=max(dot(n,li),0.0), spec=pow(max(dot(reflect(-li,n),-rd),0.0),32.0);
        float u=atan(n.y,n.x)/(2.0*3.14159)+0.5, v_=n.z*0.5+0.5;
        rgb=vec3(abs(sin(u*8.0000+time*1.2000)),abs(cos(v_*3.0000+time*0.8400)),abs(sin((u+v_)*7.0000)))*diff+spec;
    }
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}