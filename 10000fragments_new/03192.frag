uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.59;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.54; kp = rot2(1.31) * kp; kp *= 1.45; }
    v = sin(kp.y * 3.26 - t * 3.19 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.92 + t * 2.61 + ph) * 0.7;
    float wb = sin(p.y * 11.13 - t * 3.75 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.31;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.21, length(q1) * 5.56 - time * 0.51); }
	{ float fr = length(q2); q2 *= 1.0 + 0.63 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.62);
	float d = d1 * d2;
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.12, 0.85, 1.29) + vec3(0.23, 0.22, 0.15);
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
