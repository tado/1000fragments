uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.34 + 0.23 * pow(abs(cos(ra * 3.0 + t * 2.55)), 1.21);
    v = sin((rr - pet) * 20.19 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.11 * cos(sa * 5.0 + t * 0.55 + ph);
    v = sin((sr - petal) * 8.77);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.48, length(q2) * 2.25 - time * 0.57); }
	q2 = (floor(q2 * 14.3) + 0.5) / 14.3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.60);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.73 + time * 0.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
