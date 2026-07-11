uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.84 + jf * 4.0), cos(t * 0.28 * jf)) * 0.96;
        xs += sin(length(p - im) * 81.57 - t * 12.05 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.44 + 0.20 * pow(abs(cos(ra * 4.0 + t * 2.43)), 1.68);
    v = sin((rr - pet) * 20.46 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.97 - t * 2.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.15;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.71 * fr * fr; }
	q1 = abs(q1) - 0.70;
	q2 = rot2(time * 0.46) * q2;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.24 / wf * sin(wf * 2.79 * q2.y + time * 1.53); q2.y += 0.33 / wf * cos(wf * 2.07 * q2.x + time * 1.83); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.13);
	float d3 = fieldC(q3, time, 0.47);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.22 + time * 0.39);
	col = mod(col * 1.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
