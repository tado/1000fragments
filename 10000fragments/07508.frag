uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.05 + sr * 17.64 - t * 2.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	p = rot2(2.53) * p;
	{ p = vec2(atan(p.y, p.x) * 1.24, length(p) * 5.39 - time * 0.18); }
	{ float fr = length(p); p *= 1.0 + -0.40 * fr * fr; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.50 * p.y + time * 1.50); p.y += 0.42 / wf * cos(wf * 3.13 * p.x + time * 1.95); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.36), field(p, time, 2.71));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
