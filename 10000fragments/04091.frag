uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.61; vec2 jc = vec2(-0.13 + 0.3 * sin(t * 0.56 + ph), -0.10 + 0.3 * cos(t * 1.72 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 33.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.21 + sr * 14.80 - t * 1.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.80;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.38 / wf * sin(wf * 2.72 * q2.y + time * 0.85); q2.y += 0.36 / wf * cos(wf * 1.89 * q2.x + time * 1.25); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.69);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.10, 0.82, 0.99) + vec3(0.18, 0.15, 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
