uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.57;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.58; kp = rot2(1.46) * kp; kp *= 1.34; }
    v = sin(kp.y * 3.19 - t * 4.20 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.14 * cos(sa * 4.0 + t * 1.54 + ph);
    v = sin((sr - petal) * 8.57);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 0.92;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.55 * fr * fr; }
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.88;
	float d1 = fieldA(q1, (time * 0.73), 0.0);
	float d2 = fieldB(q2, (time * 0.73), 1.98);
	float d = min(d1, d2);
	vec3 col = vec3(0.975, 0.779, 0.734) * (0.08 / (abs((d)) + 0.08));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.005, 1.003, 1.009);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
