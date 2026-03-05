uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
float noise(vec2 st) {
    vec2 i=floor(st), f=fract(st);
    float a=random(i), b=random(i+vec2(1,0)), c=random(i+vec2(0,1)), d=random(i+vec2(1,1));
    vec2 u=f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
}
void main(){
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0; uv.x*=resolution.x/resolution.y;
    float zoom=mod(time*0.4500,1.0);
    float scale=pow(5.0000,zoom);
    vec2 p=fract(uv*scale*0.5+0.5);
    float v=noise(p*4.0);
    float fade=sin(zoom*3.14159);
    v=v*fade+noise(fract(uv*scale/5.0000*0.5+0.5)*4.0)*(1.0-fade);
    vec3 rgb=vec3(0.05,v*0.5+0.5*1.5,v*0.5+0.5*0.3);
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}