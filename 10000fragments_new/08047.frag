uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.04;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.62; kp = rot2(1.64) * kp; kp *= 1.24; }
    v = sin(kp.y * 1.04 - t * 2.74 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.19 * cos(sa * 9.0 + t * 1.18 + ph);
    v = sin((sr - petal) * 6.34);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.25, -0.72) * sin(length(q1) * 4.04 - time * 1.45) * 0.10;
	{ float fr = length(q2); q2 *= 1.0 + 0.34 * fr * fr; }
	q2 = fract(q2 * 2.55) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.15);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.39, 0.72, 0.74) + vec3(0.02, 0.07, 0.04);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
