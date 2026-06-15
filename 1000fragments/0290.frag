uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.60 * sin(mf + 3.0) + ph), cos(t * 0.60 * cos(mf + 3.0) + ph));
        ms += 0.082 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.06 * p.y + time * 1.62); p.y += 0.39 / wf * cos(wf * 1.52 * p.x + time * 0.96); }
	p = fract(p * 2.08) - 0.5;
	p += vec2(0.77, 0.53) * sin(length(p) * 2.03 - time * 1.77) * 0.33;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.04), field(p, time, 2.07));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
