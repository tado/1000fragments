uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.07 + t * 1.62 + ph) + sin(p.y * 17.94 - t * 1.00 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.71 * p.y + time * 0.96); p.y += 0.21 / wf * cos(wf * 2.77 * p.x + time * 1.06); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.63, lr * 1.18 + time * 0.65); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.85), field(p, time, 1.71));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
