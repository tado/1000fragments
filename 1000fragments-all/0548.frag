uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hsb2rgb(vec3 c) {
    vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
    vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);
    return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);
}
#define MAX_ITER 25
void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 c=uv*2.1000+vec2(-0.7000+sin(time*0.1)*0.05,-0.1000+cos(time*0.08)*0.05);
    vec2 z=vec2(0.0); vec3 rgb=vec3(0.0);
    for(int i=0;i<MAX_ITER;i++){
        z=vec2(z.x*z.x-z.y*z.y+c.x,2.0*abs(z.x*z.y)+c.y);
        if(dot(z,z)>4.0){rgb=hsb2rgb(vec3(float(i)/float(MAX_ITER)+time*0.05,0.9,float(i)/float(MAX_ITER))); break;}
    }
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}