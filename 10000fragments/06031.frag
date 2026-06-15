uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.08 + vec2(t * 2.78, -t * 2.78) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.75 * p.y + time * 1.48); p.y += 0.48 / wf * cos(wf * 2.58 * p.x + time * 1.60); }
	p = fract(p * 2.45) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.50, lr * 1.42 + time * 0.52); }
	p += vec2(-0.45, -0.93) * sin(length(p) * 5.60 - time * 0.54) * 0.21;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.76, 0.81, 1.51) + vec3(0.08, 0.29, 0.27);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
