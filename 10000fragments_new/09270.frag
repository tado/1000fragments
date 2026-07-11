uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.12 + vec2(t * 1.03, -t * 0.31) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.80 + sr * 7.44 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1 += vec2(-0.63, 1.00) * sin(length(q1) * 4.03 - time * 1.42) * 0.20;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.48 / wf * sin(wf * 2.31 * q2.y + time * 1.58); q2.y += 0.40 / wf * cos(wf * 1.86 * q2.x + time * 1.47); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.06);
	float d = d1 * d2;
	vec3 col = palette(d * 0.66 + time * 0.30, vec3(0.48, 0.58, 0.42), vec3(0.32, 0.32, 0.39), vec3(0.80, 1.06, 0.79), vec3(0.40, 0.36, 0.57));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
