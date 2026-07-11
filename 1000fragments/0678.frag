uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.54 + vec2(t * 0.45, -t * 0.45) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.18 * p.y + time * 1.77); p.y += 0.25 / wf * cos(wf * 1.63 * p.x + time * 1.08); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.69));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
