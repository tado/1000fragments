uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3)))) * 43758.5453);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    vec2 is = floor(st * 5.2000); vec2 fs = fract(st * 5.2000);
    float m = 1.0;
    for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){
        vec2 nb=vec2(x,y); vec2 pt=random2(is+nb);
        pt=0.5+0.5*sin(time*2.0000+6.28318*pt);
        m=min(m,length(nb+pt-fs));
    }
    float d = length(st - 0.5);
    float v = m * 0.6 + sin(d * 8.3000 - time * 3.0) * 0.2 + 0.2;
    vec3 rgb = vec3(clamp(v,0.0,1.0), clamp(v,0.0,1.0)*0.5, 0.15);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}