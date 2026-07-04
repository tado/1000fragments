uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.77 + t * 3.50 + ph) * 0.7;
    float wb = sin(p.y * 10.49 - t * 2.41 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.44;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.82; vec2 jc = vec2(0.00 + 0.3 * sin(t * 1.69 + ph), -0.62 + 0.3 * cos(t * 0.80 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 21.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.29;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.34 + 0.08 * sin(t * 3.82 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.92;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.34 / wf * sin(wf * 3.83 * q2.y + time * 1.52); q2.y += 0.29 / wf * cos(wf * 2.02 * q2.x + time * 0.70); }
	q2 += vec2(0.29, -0.72) * sin(length(q2) * 3.26 - time * 1.74) * 0.24;
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 0.89;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.34);
	float d3 = fieldC(q3, time, 1.39);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.58 + time * 0.36);
	col = clamp((col - 0.5) * 1.49 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
