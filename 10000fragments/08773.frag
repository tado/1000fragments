uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.92 * sin(mf + 3.0) + ph), cos(t * 1.92 * cos(mf + 3.0) + ph));
        ms += 0.057 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.70 * p.y + time * 0.75); p.y += 0.40 / wf * cos(wf * 1.73 * p.x + time * 1.97); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.38, 1.32, 0.82) + vec3(0.25, 0.09, 0.12);
	col = mod(col * 1.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
