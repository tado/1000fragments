uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.57 + t * 3.71 + ph) * 0.7;
    float wb = sin(p.y * 9.50 - t * 1.48 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.37;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.13, t * 1.40 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.85;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.68; kp = rot2(1.06) * kp; kp *= 1.43; }
    v = sin(kp.y * 3.72 - t * 2.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.21; q2 = rot2(0.65) * q2; }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.36);
	float d3 = fieldC(q3, time, 0.91);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.77 + time * 0.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
