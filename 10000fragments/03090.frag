uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.31 + vec2(t * 1.89, -t * 1.89) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.47;
	p = rot2(time * 1.10) * p;
	{ float fr = length(p); p *= 1.0 + 0.28 * fr * fr; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.26 * p.y + time * 1.32); p.y += 0.38 / wf * cos(wf * 3.08 * p.x + time * 0.97); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.42), field(p, time, 0.85));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
