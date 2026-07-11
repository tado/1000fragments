uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.24 + sr * 18.92 - t * 1.40 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.90 + t * 3.17 + ph) * 0.7;
    float wb = sin(p.y * 16.92 - t * 2.55 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.50;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.69;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.67) - 0.5;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.53; q1 = rot2(1.35) * q1; }
	q2 = (floor(q2 * 16.1) + 0.5) / 16.1;
	q2 = sin(q2 * 2.62 + (time * 0.82) * 1.22) * 1.49;
	float d1 = fieldA(q1, (time * 0.82), 0.0);
	float d2 = fieldB(q2, (time * 0.82), 1.97);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.82) * 0.60));
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.19, 0.19), vec3(0.67, 0.72, 0.58), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.84 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 0.941, 0.995) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
