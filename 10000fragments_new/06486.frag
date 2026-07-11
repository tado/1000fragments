uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.64 + t * 1.76 + ph) + sin(p.y * 5.53 - t * 1.76 + ph)
        + sin((p.x + p.y) * 8.76 + t * 1.76 + ph) + sin(length(p) * 9.58 - t * 1.76 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.85 + t * 2.29 + ph) + sin(p.y * 2.61 - t * 2.29 + ph)
        + sin((p.x + p.y) * 8.81 + t * 2.29 + ph) + sin(length(p) * 8.63 - t * 2.29 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.32 + 0.28 * pow(abs(cos(ra * 6.0 + t * 1.03)), 2.65);
    v = sin((rr - pet) * 20.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.15, length(q1) * 2.12 - time * 0.88); }
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	q3 = abs(q3);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.92);
	float d3 = fieldC(q3, time, 0.70);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.86, 0.17, 0.78) * (0.13 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
