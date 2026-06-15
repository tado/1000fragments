uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.99 + sin(p.y * 5.45 + t * 4.31) * 1.50 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.31;
	p = rot2(length(p) * 2.36 + time * 0.71) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.96 * p.y + time * 1.66); p.y += 0.37 / wf * cos(wf * 2.05 * p.x + time * 1.89); }
	{ p = vec2(atan(p.y, p.x) * 1.34, length(p) * 4.23 - time * 0.40); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.52), field(p, time, 1.04));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
