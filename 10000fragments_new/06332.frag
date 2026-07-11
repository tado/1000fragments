uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.73 - t * 6.41 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.32 + 0.30 * pow(abs(cos(ra * 7.0 + t * 2.33)), 2.75);
    v = sin((rr - pet) * 20.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.45 * fr * fr; }
	q1.y += sin(q1.x * 5.85 + time * 2.53) * 0.28;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.96, length(q2) * 5.06 - time * 0.21); }
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.50; q2 = rot2(0.64) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.50);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.57, 1.50, 0.57) + vec3(0.15, 0.02, 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
