uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.38 + vec2(t * 2.33, -t * 1.08) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.24 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.87 + t * 3.51 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.75; vec2 jc = vec2(0.33 + 0.3 * sin(t * 0.45 + ph), 0.53 + 0.3 * cos(t * 1.65 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.67, length(q2) * 2.31 - time * 0.33); }
	q2 = abs(q2) - 0.62;
	q3 += vec2(-0.35, -0.36) * sin(length(q3) * 4.67 - time * 2.14) * 0.33;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.93);
	float d3 = fieldC(q3, time, 0.12);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.99, 0.70, 0.17) * (0.09 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 2.55 + time * 14.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
