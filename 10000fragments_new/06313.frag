uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.30 + 0.16 * pow(abs(cos(ra * 7.0 + t * 0.67)), 1.76);
    v = sin((rr - pet) * 21.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.16, length(p) * 2.48 - time * 0.66); }
	p = fract(p * 1.20) - 0.5;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.07 * p.y + time * 0.98); p.y += 0.25 / wf * cos(wf * 2.52 * p.x + time * 2.13); }
	p = rot2(1.73) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.35));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
