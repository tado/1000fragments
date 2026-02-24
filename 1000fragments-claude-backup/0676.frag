uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

#define MAX_ITER 24
void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    uv *= 1.5000;
    float cr_val = 0.4000 * cos(time * 0.2000);
    float ci_val = 0.4000 * sin(time * 0.1500);
    vec2 z = uv;
    int iter = 0;
    for (int i = 0; i < MAX_ITER; i++) {
        if (dot(z, z) > 4.0) break;
        z = vec2(z.x*z.x - z.y*z.y + cr_val, 2.0*z.x*z.y + ci_val);
        iter++;
    }
    vec3 rgb = vec3(float(iter)/float(MAX_ITER));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}