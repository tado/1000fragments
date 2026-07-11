uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.27 + sr * 21.79 - t * 3.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.43, lr * 1.43 + time * -0.80); }
	{ p = vec2(atan(p.y, p.x) * 1.02, length(p) * 5.91 - time * 0.61); }
	p = fract(p * 2.08) - 0.5;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 1.58 * p.y + time * 1.82); p.y += 0.50 / wf * cos(wf * 3.36 * p.x + time * 0.64); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.53, 1.47, 0.79) + vec3(0.08, 0.27, 0.29);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
