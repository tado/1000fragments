uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.70 - t * 3.10 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.03 + vec2(t * 1.04, -t * 1.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	p = (floor(p * 6.2) + 0.5) / 6.2;
	p = rot2(1.43) * p;
	p *= 3.03;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.33 * p.y + time * 1.64); p.y += 0.20 / wf * cos(wf * 1.59 * p.x + time * 0.66); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.12);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.38 + time * 0.18, vec3(0.55, 0.46, 0.50), vec3(0.41, 0.40, 0.43), vec3(0.98, 1.40, 1.35), vec3(0.66, 0.32, 0.85));
	col = mod(col * 2.09, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
