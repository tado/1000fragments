uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.41 - t * 7.20 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.24 * cos(sa * 4.0 + t * 1.22 + ph);
    v = sin((sr - petal) * 16.92);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.43;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.15, length(q1) * 2.80 - time * 0.39); }
	q1 = rot2(1.33) * q1;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.50, lr * 1.52 + time * 0.35); }
	q2 = rot2(q2.y * 1.23 + time * 0.98) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.32);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.16));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.59, 0.50, 1.30) + vec3(0.20, 0.14, 0.21);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
