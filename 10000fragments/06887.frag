uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.15 * cos(sa * 3 + t * 1.20 + ph);
    v = sin((sr - petal) * 14.88);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.41 * p.y + time * 1.73); p.y += 0.41 / wf * cos(wf * 2.63 * p.x + time * 1.96); }
	p = rot2(2.58) * p;
	p *= 1.69;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.01, lr * 2.46 + time * 0.58); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.71));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
