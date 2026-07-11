uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 3.51 * sin(t * 1.40) + t * 4.12 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.52;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.65; kp = rot2(0.99) * kp; kp *= 1.42; }
    v = sin(kp.x * 2.87 - t * 1.20 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 11.66 - t * 6.25 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 22.72 - t * 5.76 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.90, length(q1) * 5.90 - time * 0.46); }
	q1 = rot2(length(q1) * 3.33 + time * 0.61) * q1;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.27 / wf * sin(wf * 3.12 * q3.y + time * 1.20); q3.y += 0.38 / wf * cos(wf * 2.80 * q3.x + time * 1.84); }
	q3 += vec2(0.28, 0.54) * sin(length(q3) * 4.61 - time * 1.69) * 0.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.15);
	float d3 = fieldC(q3, time, 1.56);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = hue(d * 0.55 + time * 0.01);
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 2.36 + time * 6.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
