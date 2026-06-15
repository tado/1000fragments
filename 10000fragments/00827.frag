uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.08 - t * 4.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	{ float fr = length(p); p *= 1.0 + 0.66 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.60, length(p) * 5.03 - time * 0.24); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.13 * p.y + time * 1.05); p.y += 0.34 / wf * cos(wf * 2.99 * p.x + time * 0.88); }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.61), field(p, time, 1.23));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
