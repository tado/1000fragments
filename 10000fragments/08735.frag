uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.32 * sin(mf + 3.0) + ph), cos(t * 2.32 * cos(mf + 3.0) + ph));
        ms += 0.040 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.66;
	{ float fr = length(p); p *= 1.0 + 0.71 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 2.38 * p.y + time * 1.50); p.y += 0.46 / wf * cos(wf * 3.07 * p.x + time * 1.60); }
	p = fract(p * 2.00) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.18), field(p, time, 2.36));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
