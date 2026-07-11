uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.98 + t * 4.47 + ph) + sin(p.y * 3.55 - t * 2.24 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.23;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.68; kp = rot2(1.25) * kp; kp *= 1.25; }
    v = sin(kp.y * 2.09 - t * 2.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.43;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.23; q1 = rot2(0.97) * q1; }
	q2 = fract(q2 * 2.72) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.39);
	float d = max(d1, d2);
	vec3 col = vec3(0.74, 1.00, 0.37) * (0.07 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
