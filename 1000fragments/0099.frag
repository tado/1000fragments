uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hashf(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noisef(vec2 p){
    vec2 i=floor(p),ff=fract(p);
    vec2 u=ff*ff*(3.0-2.0*ff);
    return mix(mix(hashf(i),hashf(i+vec2(1,0)),u.x),mix(hashf(i+vec2(0,1)),hashf(i+vec2(1,1)),u.x),u.y);
}
void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    uv.x*=resolution.x/resolution.y;
    float n=noisef(uv*4.0+time*0.2);
    vec2 center=vec2(0.5,0.5*resolution.y/resolution.x);
    float z=1.0/(length(uv-center)+0.001);
    float tunnel=mod(z*0.15-time*0.4+n*0.3,1.0);
    float ring=step(0.6,tunnel);
    float df=0.0;
    vec2 p=(uv-0.5)*2.0;
    for(float i=0.0;i<4.0;i++){
        vec2 c=vec2(sin(time*0.3+i*1.57)*0.5,cos(time*0.4+i*1.57)*0.5);
        df+=sin(length(p-c)*15.0-time*5.0)*0.25;
    }
    df=df*0.5+0.5;
    float v=ring*df+n*0.3;
    float hue=n+time*0.1+z*0.02;
    fragColor=TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5),v*(sin(hue*6.28+2.094)*0.5+0.5),v*(sin(hue*6.28+4.189)*0.5+0.5),1.0));
}
