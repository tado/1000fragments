uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.48 * sin(mf + 3.0) + ph), cos(t * 1.48 * cos(mf + 3.0) + ph));
        ms += 0.082 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.08 * p.y + time * 0.81); p.y += 0.29 / wf * cos(wf * 2.39 * p.x + time * 0.82); }
	p = abs(p) - 0.26;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.77));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
