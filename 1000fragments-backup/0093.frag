uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main(){
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/resolution.y;
    float z=0.3/(length(uv)+0.001);
    float particles=0.0;
    for(float i=0.0;i<10.0;i++){
        vec2 c=vec2(sin(time*0.4+i*0.628)*0.6,cos(time*0.3+i*0.628)*0.6);
        particles+=0.02/(length(uv-c)+0.01);
    }
    float rings=mod(z*0.1-time*0.3,1.0);
    float fog=min(z*0.12,1.0);
    float v=step(0.7,rings)*fog+particles;
    float hue=z*0.05+time*0.1;
    fragColor=TDOutputSwizzle(vec4(v*(sin(hue*6.28)*0.5+0.5),v*(sin(hue*6.28+2.094)*0.5+0.5),v*(sin(hue*6.28+4.189)*0.5+0.5),1.0));
}
