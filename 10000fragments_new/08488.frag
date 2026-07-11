uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.48 + vec2(t * 2.43, -t * 1.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.82;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.52; kp = rot2(2.04) * kp; kp *= 1.23; }
    v = sin(kp.x * 2.35 - t * 2.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.45 * p.y + time * 2.04); p.y += 0.34 / wf * cos(wf * 2.80 * p.x + time * 1.16); }
	p.x += sin(p.y * 3.56 + time * 2.92) * 0.38;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.36, lr * 1.39 + time * -0.40); }
	p = rot2(length(p) * 2.65 + time * 1.26) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.61);
	float d = d1 + d2;
	vec3 col = palette(d * 0.94 + time * 0.16, vec3(0.60, 0.46, 0.45), vec3(0.48, 0.34, 0.48), vec3(1.12, 0.77, 0.87), vec3(0.66, 0.14, 0.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
