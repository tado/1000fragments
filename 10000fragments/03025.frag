uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.89 + vec2(t * 2.08, -t * 2.08) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p = rot2(2.37) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.43 * p.y + time * 1.18); p.y += 0.35 / wf * cos(wf * 2.31 * p.x + time * 1.85); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.43, lr * 2.29 + time * 0.63); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.52 + time * 0.14, vec3(0.49, 0.58, 0.54), vec3(0.37, 0.35, 0.39), vec3(1.16, 0.85, 0.79), vec3(0.36, 0.70, 0.21));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
