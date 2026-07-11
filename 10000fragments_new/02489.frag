uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.44 + sin(p.y * 4.93 + t * 5.11) * 2.24 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 30.45 - t * 3.77 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 23.89 - t * 7.63 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.14, length(q1) * 5.89 - time * 0.22); }
	q2 = rot2(2.54) * q2;
	q2 = rot2(length(q2) * 1.53 + time * 0.67) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.98);
	float d = max(d1, d2);
	vec3 col = vec3(0.90, 0.25, 0.89) * (0.23 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
