uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.47 + t * 1.14) - 0.5) * 2.0;
    v = sin((p.y * 4.28 + zx * 1.91 + t * 1.48) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.47 + 0.16 * pow(abs(cos(ra * 2.0 + t * 0.84)), 2.33);
    v = sin((rr - pet) * 19.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.09;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.42, length(q1) * 3.02 - time * 0.35); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.13);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.37, 0.49, 0.59) * (0.22 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
