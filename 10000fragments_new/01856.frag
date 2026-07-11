uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 22.77 - t * 5.42 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 36.51 - t * 4.55 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.11 + sin(p.y * 4.15 + t * 3.74) * 4.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 2.36 + time * 3.90) * 0.14;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.41, lr * 1.10 + time * -0.97); }
	{ float fr = length(q2); q2 *= 1.0 + 0.32 * fr * fr; }
	q2 = rot2(time * -1.20) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.17);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.50));
	vec3 col = vec3(0.71, 0.38, 0.38) * (0.05 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
