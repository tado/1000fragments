uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.31 + vec2(t * 2.35, -t * 2.35) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.21;
	p = fract(p * 2.93) - 0.5;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 3.32 * p.y + time * 1.41); p.y += 0.35 / wf * cos(wf * 3.39 * p.x + time * 1.55); }
	{ float fr = length(p); p *= 1.0 + 0.69 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.07, lr * 1.98 + time * 0.26); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.03, 0.49, 0.18), vec3(0.83, 0.60, 0.75), d);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
