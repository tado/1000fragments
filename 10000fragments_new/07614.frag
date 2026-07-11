uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.37 + 0.33 * pow(abs(cos(ra * 5.0 + t * 2.70)), 1.73);
    v = sin((rr - pet) * 11.43 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 34.98 - t * 4.73 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 17.54 - t * 6.33 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.43 + t * 0.94 + ph) * 0.7;
    float wb = sin(p.y * 12.35 - t * 0.84 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.65;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.08, lr * 1.33 + time * 0.86); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.92, length(q2) * 4.17 - time * 0.23); }
	q3 = abs(q3) - 0.76;
	q3 = rot2(length(q3) * -3.61 + time * 0.67) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.49);
	float d3 = fieldC(q3, time, 0.53);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.10, 0.41), vec3(0.57, 0.64, 0.61), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.26 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
