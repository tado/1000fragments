uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.42; vec2 jc = vec2(0.00 + 0.3 * sin(t * 1.80 + ph), -0.30 + 0.3 * cos(t * 0.88 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 36.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.11 + 0.49 * sin(t * 1.52)) + vec2(-0.67, -0.14) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.28 / wf * sin(wf * 3.93 * q1.y + time * 2.05); q1.y += 0.43 / wf * cos(wf * 3.21 * q1.x + time * 1.46); }
	q2 *= 2.35;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.36);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.48));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.00, 0.02), vec3(0.80, 0.86, 0.55), cc);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
