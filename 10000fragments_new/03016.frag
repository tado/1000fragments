uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.33 + 0.29 * pow(abs(cos(ra * 6.0 + t * 0.89)), 0.96);
    v = sin((rr - pet) * 19.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.56, lr * 2.76 + time * -0.36); }
	p = rot2(p.y * 2.80 + time * 1.05) * p;
	p.x += sin(p.y * 2.37 + time * 2.26) * 0.20;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.34 * p.y + time * 1.42); p.y += 0.34 / wf * cos(wf * 3.04 * p.x + time * 1.60); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.74), field(p, time, 1.48));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
