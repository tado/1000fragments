uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=0.5;}return v;}
void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/resolution.y;
    float ff=fbm(uv*2.0+time*0.15);
    vec2 warped=uv;
    warped.x+=sin(warped.y*5.0+time*2.0+ff*3.0)*0.2;
    warped.y+=cos(warped.x*5.0+time*1.5+ff*3.0)*0.2;
    float sh=sin(warped.x*30.0+time*5.0)*0.5+0.5;
    float sv=sin(warped.y*30.0-time*4.0)*0.5+0.5;
    float v=sh*sv;
    float hue=ff*2.0+time*0.1;
    fragColor=TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5)+ff*0.3,v*(sin(hue*6.28+2.094)*0.5+0.5)+ff*0.1,v*(sin(hue*6.28+4.189)*0.5+0.5)+ff*0.5,1.0));
}
