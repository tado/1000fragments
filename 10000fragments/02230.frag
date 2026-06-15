uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.66 + sr * 21.45 - t * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 1.85 * p.y + time * 1.76); p.y += 0.27 / wf * cos(wf * 2.95 * p.x + time * 1.47); }
	p = rot2(length(p) * -3.53 + time * 0.38) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.18, lr * 2.36 + time * -0.53); }
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.02, 0.41), vec3(0.75, 0.76, 0.43), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
