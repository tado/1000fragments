uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.99 * sin(mf + 3.0) + ph), cos(t * 1.82 * cos(mf + 3.0) + ph));
        ms += 0.027 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.56 + 0.18 * pow(abs(cos(ra * 4.0 + t * 2.57)), 2.37);
    v = sin((rr - pet) * 13.80 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.12;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.53; kp = rot2(1.73) * kp; kp *= 1.16; }
    v = sin(kp.x * 1.55 - t * 3.32 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.36;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.82, length(q1) * 2.75 - time * 0.80); }
	q1.y += sin(q1.x * 2.84 + time * 1.39) * 0.36;
	q2.y += sin(q2.x * 2.00 + time * 3.10) * 0.10;
	q3 = rot2(length(q3) * -1.30 + time * 0.86) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.67);
	float d3 = fieldC(q3, time, 1.63);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.09, 0.55), vec3(0.87, 0.56, 0.60), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
