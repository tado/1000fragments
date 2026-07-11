uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.50 + 0.19 * pow(abs(cos(ra * 3.0 + t * 1.69)), 2.43);
    v = sin((rr - pet) * 13.87 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 10.04 - t * 2.66 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 17.09 - t * 5.03 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.60 + vec2(t * 1.26, -t * 1.21);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.36; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.99);
	float d3 = fieldC(q3, time, 0.05);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = vec3(0.75, 0.51, 0.50) * (0.10 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
