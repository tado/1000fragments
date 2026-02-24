uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec3 ro=vec3(0.0,0.0,-3.0), rd=normalize(vec3(uv,1.4000));
    vec3 sc=vec3(sin(time*0.7500)*0.5,cos(time*0.5250)*0.3,0.0);
    vec3 oc=ro-sc;
    float b=dot(oc,rd), c=dot(oc,oc)-1.0, disc=b*b-c;
    vec3 rgb=vec3(0.0);
    if(disc>0.0){
        float t=-b-sqrt(disc);
        vec3 hit=ro+rd*t, normal=normalize(hit-sc);
        vec3 light=normalize(vec3(cos(time*1.2000),sin(time*0.9600),-1.8000));
        float diff=max(dot(normal,light),0.0);
        float spec=pow(max(dot(reflect(-light,normal),-rd),0.0),48.0000);
        rgb=clamp(vec3(diff+0.05,diff*0.4,spec),0.0,1.0);
    }
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}