uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.77 - t * 2.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.55;
	{ float fr = length(p); p *= 1.0 + 0.49 * fr * fr; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.61 * p.y + time * 1.57); p.y += 0.31 / wf * cos(wf * 1.86 * p.x + time * 1.59); }
	p += vec2(0.58, -0.76) * sin(length(p) * 4.96 - time * 1.83) * 0.15;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.98), field(p, time, 1.97));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
