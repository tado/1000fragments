uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hsb2rgb(vec3 c) {
    vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
    vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);
    return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);
}
void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec3 ro=vec3(0.0,0.0,-3.0), rd=normalize(vec3(uv,1.8000));
    vec3 sc=vec3(sin(time*0.4500)*0.5,cos(time*0.3150)*0.3,0.0);
    vec3 oc=ro-sc;
    float b=dot(oc,rd), c=dot(oc,oc)-1.0, disc=b*b-c;
    vec3 rgb=vec3(0.0);
    if(disc>0.0){
        float t=-b-sqrt(disc);
        vec3 hit=ro+rd*t, normal=normalize(hit-sc);
        vec3 light=normalize(vec3(cos(time*1.2000),sin(time*0.9600),-2.4000));
        float diff=max(dot(normal,light),0.0);
        float spec=pow(max(dot(reflect(-light,normal),-rd),0.0),48.0000);
        rgb=clamp(hsb2rgb(vec3(normal.x*0.5+0.5+time*0.05,0.8,diff+0.1)),0.0,1.0);
    }
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}