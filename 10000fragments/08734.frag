uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.85 * sin(mf + 3.0) + ph), cos(t * 2.21 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.30 * pow(abs(cos(ra * 5.0 + t * 2.13)), 2.95);
    v = sin((rr - pet) * 23.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.04;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.96) - 0.5;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.35, length(q2) * 2.71 - time * 0.72); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.06);
	float d = min(d1, d2);
	vec3 col = vec3(0.27, 0.50, 0.95) * (0.24 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
