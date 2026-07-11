uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.19 * cos(sa * 6.0 + t * 0.54 + ph);
    v = sin((sr - petal) * 10.59);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.55 * p.y + time * 0.85); p.y += 0.28 / wf * cos(wf * 2.77 * p.x + time * 1.66); }
	p += vec2(-0.12, 0.62) * sin(length(p) * 3.61 - time * 2.20) * 0.12;
	p = (floor(p * 21.0) + 0.5) / 21.0;
	{ float fr = length(p); p *= 1.0 + -0.63 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.58, 0.27, 0.20) * (0.16 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
