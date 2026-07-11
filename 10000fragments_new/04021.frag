uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.89 - t * 2.97 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.72 * p.y + time * 1.77); p.y += 0.27 / wf * cos(wf * 3.71 * p.x + time * 1.95); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.88), field(p, time, 1.77));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
