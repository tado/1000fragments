uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.08 + vec2(t * 1.21, -t * 0.31) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	{ p = vec2(atan(p.y, p.x) * 1.84, length(p) * 3.39 - time * 0.73); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.20 * p.y + time * 0.74); p.y += 0.33 / wf * cos(wf * 2.69 * p.x + time * 0.95); }
	p = rot2(length(p) * 2.85 + time * 1.25) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.33, lr * 1.51 + time * -0.89); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.40, 0.22, 0.54) * (0.18 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
