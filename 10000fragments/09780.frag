uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.54, t * 0.98 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.20; vec2 jc = vec2(-0.36 + 0.3 * sin(t * 1.28 + ph), -0.46 + 0.3 * cos(t * 1.28 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 1.71 * p.y + time * 1.11); p.y += 0.36 / wf * cos(wf * 2.23 * p.x + time * 1.25); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.30);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.90 + time * 0.09, vec3(0.59, 0.41, 0.53), vec3(0.46, 0.35, 0.43), vec3(0.82, 0.85, 1.28), vec3(0.34, 0.60, 0.83));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
