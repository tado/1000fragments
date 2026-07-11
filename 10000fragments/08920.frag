uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.68 * sin(mf + 3.0) + ph), cos(t * 1.68 * cos(mf + 3.0) + ph));
        ms += 0.056 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.50 * p.y + time * 1.80); p.y += 0.34 / wf * cos(wf * 3.17 * p.x + time * 1.11); }
	p = fract(p * 2.62) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.51 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.39, length(p) * 5.10 - time * 0.64); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.90), field(p, time, 1.80));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
