uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.35 * pow(abs(cos(ra * 3.0 + t * 1.93)), 2.17);
    v = sin((rr - pet) * 10.25 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.28);
    float gsh = hash21(vec2(grow, floor(t * 5.21))) - 0.5;
    float gx = p.x + gsh * 0.50;
    v = sin(gx * 12.09 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.25));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.65 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.46 + t * 3.87 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.14, length(q2) * 5.83 - time * 0.81); }
	q2 = rot2(1.52) * q2;
	{ q3 = vec2(atan(q3.y, q3.x) * 1.60, length(q3) * 4.12 - time * 0.55); }
	for(int fo = 0; fo < 2; fo++){ q3 = abs(q3) - 0.28; q3 = rot2(0.96) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.71);
	float d3 = fieldC(q3, time, 1.43);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = vec3(0.70, 0.73, 0.94) * (0.17 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
