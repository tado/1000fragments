uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.16 + sr * 13.40 - t * 4.29 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.54, t * 0.75 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.01, length(q1) * 4.36 - time * 0.43); }
	q1 = rot2(length(q1) * 2.19 + time * 0.60) * q1;
	q2 = rot2(time * -1.52) * q2;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.33; q2 = rot2(1.88) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.69);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.23, 0.40, 0.22), vec3(0.57, 0.71, 0.97), cc);
	col = mod(col * 2.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
