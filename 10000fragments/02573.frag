uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.17 * cos(sa * 5 + t * 0.87 + ph);
    v = sin((sr - petal) * 17.96);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.60;
	p = rot2(length(p) * 1.28 + time * 0.94) * p;
	p = rot2(p.y * -1.48 + time * 0.58) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.14, lr * 2.48 + time * 0.54); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 1.51 * p.y + time * 1.12); p.y += 0.29 / wf * cos(wf * 2.56 * p.x + time * 1.10); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.44, 1.19, 1.42) + vec3(0.04, 0.18, 0.19);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
