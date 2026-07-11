uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.23 * cos(sa * 5.0 + t * 1.99 + ph);
    v = sin((sr - petal) * 12.93);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.04 - t * 3.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.13;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.57, length(q1) * 2.75 - (time * 0.81) * 0.21); }
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.51; q2 = rot2(1.48) * q2; }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.04, lr * 1.59 + (time * 0.81) * 0.99); }
	float d1 = fieldA(q1, (time * 0.81), 0.0);
	float d2 = fieldB(q2, (time * 0.81), 1.67);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.30, 0.26), vec3(0.52, 0.54, 0.46), smoothstep(0.0, 1.0, cc));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.25 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col = clamp(col, 0.0, 1.0) * vec3(0.961, 1.000, 0.949) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
