uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 rot2d(vec2 v, float a) {
    return vec2(v.x*cos(a)-v.y*sin(a), v.x*sin(a)+v.y*cos(a));
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy * 2.0 - 1.0;
    float d = 1.5000;
    float spd = 0.6667;
    vec2 rr = rot2d(uv, radians(time*15.4000));
    vec2 rg = rot2d(uv, radians(time*6.7000));
    vec2 rb = rot2d(uv, radians(time*-15.8000));
    float r = mod(rr.x + mod(time/d*spd, 1.0), 1.0/d)*d;
    float g = mod(rg.y + mod(time/d*spd, 1.0), 1.0/d)*d;
    float b = mod(rb.x - mod(time/d*spd, 1.0), 1.0/d)*d;
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}