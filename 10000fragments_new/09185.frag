uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.02;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.46; kp = rot2(2.29) * kp; kp *= 1.31; }
    v = sin(kp.y * 1.04 - t * 2.70 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.61 + t * 4.63 + ph) + sin(p.y * 7.10 - t * 4.63 + ph)
        + sin((p.x + p.y) * 9.83 + t * 4.63 + ph) + sin(length(p) * 15.94 - t * 4.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.20;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.21, length(q2) * 4.94 - time * 0.91); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.21, lr * 1.78 + time * 0.39); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.40);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.68 + time * 0.30, vec3(0.48, 0.49, 0.51), vec3(0.38, 0.48, 0.45), vec3(0.72, 1.14, 1.09), vec3(0.07, 0.39, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
