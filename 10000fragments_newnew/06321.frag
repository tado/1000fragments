uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.76 - t * 7.60 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.56;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.73; kp = rot2(0.32) * kp; kp *= 1.17; }
    v = sin(kp.x * 2.08 - t * 4.20 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.78;
    v = 0.5 * (sin(4.0 * cp.x + t * 2.24) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 1.16) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.40, lr * 2.06 + time * -0.70); }
	q1.x += sin(q1.y * 5.57 + time * 3.02) * 0.20;
	q2 = rot2(time * 0.89) * q2;
	q2 = fract(q2 * 1.65) - 0.5;
	q3 = rot2(2.09) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.56);
	float d3 = fieldC(q3, time, 1.58);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.22, 0.12), vec3(0.65, 0.72, 0.68), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
