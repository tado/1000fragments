uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.14 + vec2(t * 0.51, -t * 0.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.06 + sr * 16.44 - t * 3.88 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	p = rot2(p.y * 2.93 + time * 0.50) * p;
	{ p = vec2(atan(p.y, p.x) * 1.05, length(p) * 2.21 - time * 0.59); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 1.50 * p.y + time * 1.06); p.y += 0.41 / wf * cos(wf * 2.97 * p.x + time * 1.72); }
	p = rot2(time * 0.59) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.62);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.98 + time * 0.28, vec3(0.55, 0.42, 0.48), vec3(0.39, 0.40, 0.36), vec3(1.28, 0.95, 0.97), vec3(0.11, 0.29, 0.92));
	col = fract(col * 2.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
