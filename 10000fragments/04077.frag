uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.10 * cos(sa * 8 + t * 1.95 + ph);
    v = sin((sr - petal) * 13.38);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(length(p) * -1.35 + time * 0.79) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 3.18 * p.y + time * 1.84); p.y += 0.31 / wf * cos(wf * 3.60 * p.x + time * 1.98); }
	p += vec2(-0.79, -0.60) * sin(length(p) * 2.69 - time * 1.60) * 0.23;
	{ p = vec2(atan(p.y, p.x) * 1.60, length(p) * 4.89 - time * 0.62); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.50), field(p, time, 1.01));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
