uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.54 + 0.24 * pow(abs(cos(ra * 4.0 + t * 2.82)), 2.37);
    v = sin((rr - pet) * 16.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.22;
	p = rot2(time * 1.33) * p;
	{ float fr = length(p); p *= 1.0 + -0.61 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.61, length(p) * 4.18 - time * 0.38); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.24 * p.y + time * 1.84); p.y += 0.30 / wf * cos(wf * 1.72 * p.x + time * 1.51); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.10), field(p, time, 2.20));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
