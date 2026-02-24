uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy/resolution.xy)*2.0-1.0;
    uv.x *= resolution.x/resolution.y;
    float plasma = sin(uv.x*8.0+time)*cos(uv.y*6.0+time*0.7)*0.5+0.5;
    vec2 z = uv * 1.5;
    float cr_v = 0.4100*cos(time*0.2), ci_v = 0.4100*sin(time*0.15);
    int iter=0;
    for(int i=0;i<25;i++){if(dot(z,z)>4.0)break;z=vec2(z.x*z.x-z.y*z.y+cr_v,2.0*z.x*z.y+ci_v);iter++;}
    float jv = float(iter)/25.0;
    float v = mix(plasma, jv, 0.5);
    vec3 rgb = vec3(abs(sin(v*3.14)),abs(sin(v*3.14+2.094)),abs(sin(v*3.14+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}