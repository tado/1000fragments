uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.48 + 0.21 * pow(abs(cos(ra * 2.0 + t * 0.82)), 0.96);
    v = sin((rr - pet) * 17.81 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.51 + 0.34 * pow(abs(cos(ra * 4.0 + t * 2.20)), 1.19);
    v = sin((rr - pet) * 18.15 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1 = (floor(q1 * 26.1) + 0.5) / 26.1;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.88, length(q2) * 4.12 - time * 0.55); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.03, lr * 2.94 + time * -0.76); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.70);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.68 + time * 0.17, vec3(0.54, 0.54, 0.42), vec3(0.31, 0.34, 0.32), vec3(1.12, 0.74, 1.29), vec3(0.37, 0.66, 0.98));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
