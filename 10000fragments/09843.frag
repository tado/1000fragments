uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.42; vec2 jc = vec2(0.27 + 0.3 * sin(t * 0.41 + ph), 0.30 + 0.3 * cos(t * 0.41 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.65, t * 1.16 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.77, length(p) * 4.54 - time * 0.73); }
	p += vec2(0.55, 1.00) * sin(length(p) * 3.72 - time * 1.55) * 0.18;
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = d1 * d2;
	vec3 col = palette(d * 0.96 + time * 0.16, vec3(0.43, 0.42, 0.44), vec3(0.39, 0.32, 0.36), vec3(0.86, 1.10, 1.03), vec3(0.79, 0.09, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
