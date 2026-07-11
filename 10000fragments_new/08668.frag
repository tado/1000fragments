uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.24 * pow(abs(cos(ra * 2.0 + t * 2.88)), 2.52);
    v = sin((rr - pet) * 8.84 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.25 * cos(sa * 6.0 + t * 1.45 + ph);
    v = sin((sr - petal) * 15.70);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.26 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.51 + t * 1.53 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.74;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * -3.50 + time * 0.61) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.85, length(q2) * 5.42 - time * 0.27); }
	q3 = rot2(q3.y * 1.66 + time * 0.34) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.22);
	float d3 = fieldC(q3, time, 1.87);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.37 + time * 0.28);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
