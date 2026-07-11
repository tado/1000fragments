uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.91 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.20 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.95) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.56 + 0.25 * pow(abs(cos(ra * 4.0 + t * 1.02)), 0.57);
    v = sin((rr - pet) * 20.93 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.21 * cos(sa * 4.0 + t * 1.41 + ph);
    v = sin((sr - petal) * 15.23);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.38;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 2.82) - 0.5;
	q1 = rot2(q1.y * -2.36 + time * 0.45) * q1;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.38 / wf * sin(wf * 3.82 * q2.y + time * 2.07); q2.y += 0.43 / wf * cos(wf * 1.77 * q2.x + time * 1.36); }
	q3 = (floor(q3 * 18.9) + 0.5) / 18.9;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.03);
	float d3 = fieldC(q3, time, 1.45);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.25));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.63, 0.64, 1.37) + vec3(0.04, 0.21, 0.09);
	col = clamp((col - 0.5) * 2.08 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
