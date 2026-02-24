uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
#define MAX_ITER 36
void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    uv *= 2.1000;
    float cr_val = 0.7000 * cos(time * 0.3000);
    float ci_val = 0.7000 * sin(time * 0.2500);
    vec2 z = uv;
    int iter = 0;
    for (int i = 0; i < MAX_ITER; i++) {
        if (dot(z, z) > 4.0) break;
        z = vec2(z.x*z.x - z.y*z.y + cr_val, 2.0*z.x*z.y + ci_val);
        iter++;
    }
    vec3 rgb = hsb2rgb(vec3(float(iter)/float(MAX_ITER), 0.8, float(iter)/float(MAX_ITER)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}