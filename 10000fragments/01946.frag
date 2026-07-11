uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.92 + sr * 10.20 - t * 0.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.37, 0.07) * sin(length(p) * 5.23 - time * 0.50) * 0.28;
	p = fract(p * 1.80) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.22, lr * 2.18 + time * -0.20); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 1.57 * p.y + time * 1.81); p.y += 0.45 / wf * cos(wf * 2.07 * p.x + time * 1.71); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.10), field(p, time, 2.20));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
