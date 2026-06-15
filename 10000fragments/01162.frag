uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.42 + t * 2.51 + ph) + sin(p.y * 4.46 - t * 5.56 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	{ p = vec2(atan(p.y, p.x) * 2.34, length(p) * 5.48 - time * 0.32); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 3.87 * p.y + time * 1.88); p.y += 0.23 / wf * cos(wf * 3.00 * p.x + time * 1.26); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.46));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
