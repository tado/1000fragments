uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.44 - t * 1.76;
    v = sin(floor(lv * 4.5) / 4.5 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.30 * pow(abs(cos(ra * 6.0 + t * 1.93)), 1.24);
    v = sin((rr - pet) * 10.08 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.17 * pow(abs(cos(ra * 5.0 + t * 0.85)), 2.24);
    v = sin((rr - pet) * 17.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.44;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = sin(q1 * 2.75 + time * 0.66) * 1.23;
	q1 += vec2(0.26, 0.45) * sin(length(q1) * 5.34 - time * 1.59) * 0.28;
	q2 = rot2(q2.y * 3.27 + time * 0.28) * q2;
	q3.y += sin(q3.x * 5.49 + time * 3.73) * 0.32;
	q3 *= 2.00;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.64);
	float d3 = fieldC(q3, time, 1.99);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.09 + time * 0.34, vec3(0.56, 0.55, 0.55), vec3(0.47, 0.41, 0.43), vec3(1.01, 1.03, 0.99), vec3(0.70, 0.30, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
