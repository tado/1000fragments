uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.83 + sr * 7.69 - t * 1.16 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.61 + t * 1.78 + ph) * 0.7;
    float wb = sin(p.y * 10.76 - t * 2.42 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.64;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.74 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.68 + t * 1.50 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = sin(q1 * 2.37 + time * 0.67) * 1.23;
	q2 = sin(q2 * 1.85 + time * 1.05) * 1.26;
	q2 = (floor(q2 * 13.0) + 0.5) / 13.0;
	q3 += vec2(0.37, -0.27) * sin(length(q3) * 3.89 - time * 1.25) * 0.35;
	q3 = rot2(q3.y * 1.62 + time * 0.47) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.66);
	float d3 = fieldC(q3, time, 1.49);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.55 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
