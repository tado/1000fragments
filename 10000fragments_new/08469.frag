uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.48 + jf * 4.0), cos(t * 0.27 * jf)) * 0.63;
        xs += sin(length(p - im) * 192.40 - t * 7.57 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 4.59 * sin(t * 0.89) + t * 1.49 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.14;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.65; kp = rot2(1.79) * kp; kp *= 1.35; }
    v = sin(kp.x * 1.72 - t * 1.86 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(-0.05, -0.74) * sin(length(q1) * 4.45 - time * 2.04) * 0.24;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.27 / wf * sin(wf * 3.36 * q2.y + time * 0.73); q2.y += 0.33 / wf * cos(wf * 2.33 * q2.x + time * 1.82); }
	q2 += vec2(-0.14, -0.63) * sin(length(q2) * 2.19 - time * 0.85) * 0.28;
	q3.x += sin(q3.y * 3.51 + time * 1.64) * 0.31;
	q3 = rot2(time * -0.50) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.68);
	float d3 = fieldC(q3, time, 1.38);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.30 + time * 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
