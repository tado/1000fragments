uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 hash2(vec2 p){
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=0.5;}return v;}
void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    st.x*=resolution.x/resolution.y;
    float ff=fbm(st*3.0+time*0.1);
    vec2 warped=st+vec2(ff-0.5)*0.4;
    warped*=5.0;
    vec2 i_st=floor(warped),f_st=fract(warped);
    float m_dist=1.0;
    for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
        vec2 nb=vec2(float(x),float(y));
        vec2 pt=hash2(i_st+nb);
        pt=0.5+0.5*sin(time*3.0+6.28*pt);
        m_dist=min(m_dist,length(nb+pt-f_st));
    }
    float edge=1.0-step(0.06,m_dist);
    vec3 col=vec3(ff*0.5,m_dist*0.8,1.0-m_dist*0.5);
    col+=edge;
    fragColor=TDOutputSwizzle(vec4(col,1.0));
}
