uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.47 + t * 0.67 + ph) + sin(p.y * 4.48 - t * 0.67 + ph)
        + sin((p.x + p.y) * 10.00 + t * 0.67 + ph) + sin(length(p) * 3.75 - t * 0.67 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.13;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.45; kp = rot2(1.38) * kp; kp *= 1.15; }
    v = sin(kp.y * 2.13 - t * 4.23 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 13.69 - t * 3.89 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 36.71 - t * 3.09 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.26 / wf * sin(wf * 2.96 * q1.y + (time * 0.58) * 2.00); q1.y += 0.42 / wf * cos(wf * 3.80 * q1.x + (time * 0.58) * 2.10); }
	q1 *= 1.0 + 0.13 * sin((time * 0.58) * 1.60);
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.93;
	q2 = (floor(q2 * 23.2) + 0.5) / 23.2;
	q3 *= 2.31;
	float d1 = fieldA(q1, (time * 0.58), 0.0);
	float d2 = fieldB(q2, (time * 0.58), 0.37);
	float d3 = fieldC(q3, (time * 0.58), 1.21);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.53, 0.44, 0.50) + vec3(0.09, 0.08, 0.09);
	col *= 0.85 + 0.20 * sin(gl_FragCoord.y * 1.24 + (time * 0.58) * 9.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.026, 0.975, 0.919) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
