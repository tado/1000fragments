uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.31 + 0.35 * pow(abs(cos(ra * 7.0 + t * 2.66)), 0.83);
    v = sin((rr - pet) * 20.84 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.03 + sr * 21.79 - t * 3.52 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.02 + 0.16 * sin(t * 0.81)) + vec2(-0.89, 0.24) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 24; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 24.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.80;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.0 + 0.10 * sin(time * 1.67);
	q2 = rot2(length(q2) * 3.00 + time * 0.34) * q2;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.38 / wf * sin(wf * 2.48 * q2.y + time * 1.39); q2.y += 0.38 / wf * cos(wf * 3.50 * q2.x + time * 1.07); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.72);
	float d3 = fieldC(q3, time, 1.80);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.29, 0.89, 0.68) + vec3(0.00, 0.00, 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
