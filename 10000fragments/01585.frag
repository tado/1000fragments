uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.98; vec2 jc = vec2(-0.01 + 0.3 * sin(t * 0.68 + ph), 0.50 + 0.3 * cos(t * 0.68 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.00; vec2 jc = vec2(-0.14 + 0.3 * sin(t * 0.83 + ph), 0.66 + 0.3 * cos(t * 0.83 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(32) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.21 + time * 0.21, vec3(0.44, 0.53, 0.49), vec3(0.50, 0.37, 0.34), vec3(0.86, 1.11, 1.26), vec3(0.42, 0.64, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
