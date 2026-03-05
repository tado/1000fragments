uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    vec2 z=uv; float col_acc=0.0;
    for(int i=0;i<8;i++){
        z=abs(z);
        if(z.x<z.y) z=z.yx;
        z=z*1.9500-1.0000+sin(time*0.3000)*0.1;
        col_acc+=exp(-length(z)*0.6000);
    }
    float v=clamp(col_acc/8.0000,0.0,1.0);
    vec3 rgb=vec3(v*1.8,v*0.7,0.1);
    fragColor=TDOutputSwizzle(vec4(rgb,1.0));
}