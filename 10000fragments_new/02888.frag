uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.85 + t * 1.45 + ph) + sin(p.y * 4.82 - t * 3.31 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.37 + 0.15 * pow(abs(cos(ra * 2.0 + t * 2.49)), 2.80);
    v = sin((rr - pet) * 12.11 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.58) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.99, length(q2) * 3.31 - time * 0.24); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.40);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.26));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.03 + time * 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
