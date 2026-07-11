uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.88 + sin(p.y * 1.02 + t * 5.64) * 3.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.95;
	p = rot2(length(p) * 1.04 + time * 0.66) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.15 * p.y + time * 0.98); p.y += 0.46 / wf * cos(wf * 3.51 * p.x + time * 1.22); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.09), field(p, time, 2.17));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
