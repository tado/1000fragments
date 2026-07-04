uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.15 * cos(sa * 3.0 + t * 2.38 + ph);
    v = sin((sr - petal) * 13.33);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.42 * p.y + time * 1.58); p.y += 0.50 / wf * cos(wf * 3.41 * p.x + time * 1.30); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.20, lr * 1.80 + time * 0.33); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.54), field(p, time, 1.07));
	col = 0.5 + 0.5 * col;
	col *= 0.84 + 0.13 * sin(gl_FragCoord.y * 1.64 + time * 5.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
