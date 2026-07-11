uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.40, t * 1.10 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.24; vec2 jc = vec2(0.01 + 0.3 * sin(t * 1.15 + ph), -0.69 + 0.3 * cos(t * 1.45 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 38.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.77 * p.y + time * 2.13); p.y += 0.33 / wf * cos(wf * 3.28 * p.x + time * 2.14); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.19);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.57 + time * 0.16, vec3(0.49, 0.46, 0.59), vec3(0.47, 0.36, 0.36), vec3(0.78, 1.29, 1.35), vec3(0.48, 0.24, 0.22));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
