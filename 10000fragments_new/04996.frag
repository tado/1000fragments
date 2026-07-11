uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.36; vec2 jc = vec2(0.15 + 0.3 * sin(t * 0.94 + ph), 0.30 + 0.3 * cos(t * 0.68 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 21.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.01, t * 2.13 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.45) - 0.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.39 / wf * sin(wf * 1.85 * q1.y + time * 1.56); q1.y += 0.39 / wf * cos(wf * 3.63 * q1.x + time * 2.10); }
	q2 = fract(q2 * 1.53) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.99);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.40 + time * 0.09, vec3(0.55, 0.53, 0.55), vec3(0.42, 0.42, 0.31), vec3(1.07, 1.00, 0.95), vec3(0.38, 0.97, 0.67));
	col = mod(col * 2.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
