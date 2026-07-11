uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 7.07 * sin(t * 0.44) + t * 4.78 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.11 * cos(sa * 5.0 + t * 0.98 + ph);
    v = sin((sr - petal) * 7.88);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 3.37 * sin(t * 0.65) + t * 5.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 2.98;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.76, length(q1) * 5.35 - time * 0.22); }
	q2 = rot2(time * 0.45) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.95);
	float d3 = fieldC(q3, time, 1.55);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = palette(d * 1.47 + time * 0.39, vec3(0.50, 0.53, 0.58), vec3(0.30, 0.36, 0.36), vec3(0.83, 1.12, 1.10), vec3(0.99, 0.88, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
