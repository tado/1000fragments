uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.59, t * 2.26 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	p += vec2(0.55, 0.45) * sin(length(p) * 2.10 - time * 1.72) * 0.38;
	{ p = vec2(atan(p.y, p.x) * 1.80, length(p) * 4.15 - time * 0.34); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.36 * p.y + time * 1.50); p.y += 0.31 / wf * cos(wf * 2.19 * p.x + time * 1.44); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.62), field(p, time, 1.23));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
