uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
    vec2 i = floor(st); vec2 f = fract(st);
    float a = random(i), b = random(i + vec2(1,0)), c = random(i + vec2(0,1)), d = random(i + vec2(1,1));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
void main() {
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0;
    uv.x*=resolution.x/resolution.y;
    float ang=atan(uv.y,uv.x), r=length(uv);
    float seg=6.28318/7.0000;
    ang=mod(ang+time*1.4000,seg);
    if(ang>seg*0.5) ang=seg-ang;
    vec2 p=vec2(cos(ang),sin(ang))*r;
    float v=noise(p*6.0000+time*0.15);
    vec3 rgb=vec3(abs(sin(v*3.14159)), abs(sin(v*3.14159+2.094)), abs(sin(v*3.14159+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}