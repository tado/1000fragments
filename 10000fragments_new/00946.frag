uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.59 + t * 4.24 + ph) + sin(p.y * 4.02 - t * 4.24 + ph)
        + sin((p.x + p.y) * 3.82 + t * 4.24 + ph) + sin(length(p) * 9.34 - t * 4.24 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.24 * pow(abs(cos(ra * 5.0 + t * 2.75)), 2.24);
    v = sin((rr - pet) * 15.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 25.7) + 0.5) / 25.7;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.93, length(q2) * 4.54 - time * 0.44); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.90);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.71, 0.58, 0.91) + vec3(0.08, 0.22, 0.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
