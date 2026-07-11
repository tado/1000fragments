uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.22 * pow(abs(cos(ra * 4.0 + t * 1.55)), 1.82);
    v = sin((rr - pet) * 11.40 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.87 + t * 2.87 + ph) + sin(p.y * 3.06 - t * 4.12 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.77;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -3.51 + time * 0.92) * q1;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.44; q1 = rot2(2.52) * q1; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.02);
	float d = min(d1, d2);
	vec3 col = vec3(0.29, 0.44, 0.59) * (0.15 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
