uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.00 - t * 6.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	p = abs(p) - 0.31;
	{ float fr = length(p); p *= 1.0 + 0.40 * fr * fr; }
	p += vec2(-0.95, 0.41) * sin(length(p) * 3.77 - time * 1.48) * 0.11;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 1.89 * p.y + time * 1.30); p.y += 0.45 / wf * cos(wf * 3.59 * p.x + time * 1.70); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.44));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
