uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.52 + vec2(t * 1.11, -t * 1.11) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	{ float fr = length(p); p *= 1.0 + -0.45 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.80 * p.y + time * 0.98); p.y += 0.49 / wf * cos(wf * 2.58 * p.x + time * 1.95); }
	p = rot2(p.y * -1.74 + time * 0.91) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.69));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
