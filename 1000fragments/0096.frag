uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 hash2(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}
void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/resolution.y;
    float r=length(uv),a=atan(uv.y,uv.x);
    float z=0.4/(r+0.001);
    vec2 tuv=vec2(a/6.28318*6.0,z-time*0.5);
    vec2 i_st=floor(tuv),f_st=fract(tuv);
    float m_dist=1.0;
    for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
        vec2 nb=vec2(float(x),float(y));
        vec2 pt=hash2(i_st+nb);
        pt=0.5+0.5*sin(time*4.0+6.28*pt);
        m_dist=min(m_dist,length(nb+pt-f_st));
    }
    float edge=1.0-step(0.08,m_dist);
    float fog=min(z*0.1,1.0);
    fragColor=TDOutputSwizzle(vec4(edge*fog*2.0,m_dist*fog,fog*(1.0-m_dist),1.0));
}
