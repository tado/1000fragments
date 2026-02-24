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
    vec3 rgb = hsb2rgb(vec3((angle / 6.28318) + mod(time*0.9500, 1.0), 0.7000, 1.0000 * radius));
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}