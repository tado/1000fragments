uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.50 - t * 3.85 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.23 * p.y + time * 0.67); p.y += 0.31 / wf * cos(wf * 2.74 * p.x + time * 1.78); }
	p = fract(p * 2.24) - 0.5;
	p *= 2.86;
	{ float fr = length(p); p *= 1.0 + -0.21 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.09), field(p, time, 2.17));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.86 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
