uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.57 + sin(p.y * 4.30 + t * 3.08) * 4.11 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.65, lr * 1.83 + time * -0.51); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 1.73 * p.y + time * 1.77); p.y += 0.45 / wf * cos(wf * 3.95 * p.x + time * 1.41); }
	p = (floor(p * 11.2) + 0.5) / 11.2;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.69, 1.12, 1.12) + vec3(0.03, 0.01, 0.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
