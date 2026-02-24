uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

#define MAX_ITER 30
void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 c=uv*2.4000+vec2(-0.6000+sin(time*0.1)*0.05,-0.0500+cos(time*0.08)*0.05);
    vec2 z=vec2(0.0); vec3 rgb=vec3(0.0);
    for(int i=0;i<MAX_ITER;i++){
        z=vec2(abs(z.x),abs(z.y)); z=vec2(z.x*z.x-z.y*z.y+c.x,2.0*z.x*z.y+c.y);
        if(dot(z,z)>4.0){rgb=vec3(pow(float(i)/float(MAX_ITER),0.5),0.0,1.0-float(i)/float(MAX_ITER)); break;}
    }
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}