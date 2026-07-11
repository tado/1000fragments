uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.39 + vec2(t * 1.75, -t * 0.40) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.94;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.41; kp = rot2(0.88) * kp; kp *= 1.32; }
    v = sin(kp.x * 1.31 - t * 3.50 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.46 + ph), sin(lt * 3.0 + t * 0.97)) * 0.99;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.56) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.68;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 = rot2(length(q3) * -2.48 + time * 1.04) * q3;
	q3 = rot2(q3.y * 2.12 + time * 0.30) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.98);
	float d3 = fieldC(q3, time, 1.01);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.93, 0.49, 0.80) * (0.18 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
