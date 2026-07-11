uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.21 * pow(abs(cos(ra * 5.0 + t * 1.71)), 1.66);
    v = sin((rr - pet) * 10.86 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.12 * cos(sa * 9.0 + t * 2.76 + ph);
    v = sin((sr - petal) * 16.38);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.81) - 0.5;
	q2 *= 2.66;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.17);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.20 + time * 0.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
