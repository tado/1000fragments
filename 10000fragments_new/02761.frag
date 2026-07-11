uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.12 + t * 2.05 + ph) * 0.7;
    float wb = sin(p.y * 19.63 - t * 0.99 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.26;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.61;
	p.y += sin(p.x * 4.78 + time * 3.40) * 0.21;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.19, lr * 1.36 + time * -0.36); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.17 * p.y + time * 2.14); p.y += 0.36 / wf * cos(wf * 3.54 * p.x + time * 1.72); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.80), field(p, time, 1.59));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
