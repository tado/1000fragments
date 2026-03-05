uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

#define MAX_ITER 36
void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y; uv*=2.7000;
    float crv=0.7000*cos(time*0.4000), civ=0.7000*sin(time*0.1500);
    vec2 z=uv; int iter=0;
    for(int i=0;i<MAX_ITER;i++){if(dot(z,z)>4.0)break; z=vec2(z.x*z.x-z.y*z.y+crv,2.0*z.x*z.y+civ); iter++;}
    vec3 rgb=vec3(pow(float(iter)/float(MAX_ITER),0.5));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}