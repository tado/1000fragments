uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.87;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.55; kp = rot2(0.36) * kp; kp *= 1.30; }
    v = sin(kp.x * 2.00 - t * 4.08 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.95 - t * 4.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 27.0) + 0.5) / 27.0;
	q2 = fract(q2 * 1.56) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d = min(d1, d2);
	vec3 col = vec3(0.61, 0.21, 0.80) * (0.19 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
