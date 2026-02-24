uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    vec2 toCenter = vec2(0.5) - st;
    float angle = atan(toCenter.y, toCenter.x);
    float radius = length(toCenter) * 2.0;
    vec3 rgb = hsb2rgb(vec3((angle / 6.28318) + mod(time*0.8000, 1.0), 1.0000, 0.9000 * sin(radius*10.0000 - time*2.4000)*0.5+0.5));
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}