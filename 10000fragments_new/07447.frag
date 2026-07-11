uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.27; vec2 jc = vec2(-0.29 + 0.3 * sin(t * 0.55 + ph), 0.57 + 0.3 * cos(t * 1.10 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 27.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.98, t * 1.17 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	p.y += sin(p.x * 3.03 + time * 1.94) * 0.33;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.67 + time * 0.19, vec3(0.42, 0.56, 0.54), vec3(0.31, 0.47, 0.48), vec3(1.01, 0.96, 0.82), vec3(0.49, 0.17, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
