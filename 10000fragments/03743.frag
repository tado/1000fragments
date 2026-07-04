uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.74 + vec2(t * 2.55, -t * 1.07) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.19 + t * 2.02 + ph) * 0.7;
    float wb = sin(p.y * 17.85 - t * 2.84 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.35;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.48 + 0.26 * pow(abs(cos(ra * 6.0 + t * 1.32)), 1.90);
    v = sin((rr - pet) * 19.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.77; }
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.47);
	float d3 = fieldC(q3, time, 1.73);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.28, 0.52), vec3(0.62, 0.84, 0.57), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
