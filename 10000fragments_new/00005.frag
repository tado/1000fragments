uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.49;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.51; kp = rot2(2.43) * kp; kp *= 1.20; }
    v = sin(kp.x * 2.80 - t * 4.77 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.21 + t * 1.85 + ph) * 0.7;
    float wb = sin(p.y * 9.28 - t * 1.92 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.63;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.58 * fr * fr; }
	{ q1 = vec2(atan(q1.y, q1.x) * 2.82, length(q1) * 4.00 - time * 0.30); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.91);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.60 + time * 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
