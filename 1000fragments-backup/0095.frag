uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/resolution.y;
    float df=0.0;
    for(float i=0.0;i<5.0;i++){
        vec2 c=vec2(sin(time*0.3+i*1.25)*0.5,cos(time*0.4+i*0.9)*0.5);
        df+=sin(length(uv-c)*20.0-time*6.0)*0.5+0.5;
    }
    df/=5.0;
    float sh=sin(uv.x*50.0*df+time*3.0)*0.5+0.5;
    float sv=sin(uv.y*50.0*df-time*2.0)*0.5+0.5;
    float v=sh*sv;
    fragColor=TDOutputSwizzle(vec4(v*df,df*0.5,v*(1.0-df),1.0));
}
