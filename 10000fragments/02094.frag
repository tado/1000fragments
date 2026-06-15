uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.90 - t * 6.65 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.79 + sin(p.y * 5.73 + t * 1.42) * 1.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	{ p = vec2(atan(p.y, p.x) * 1.76, length(p) * 5.22 - time * 0.16); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.00 * p.y + time * 1.13); p.y += 0.29 / wf * cos(wf * 2.16 * p.x + time * 1.34); }
	p = rot2(p.y * 1.64 + time * 0.23) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.84);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.88 + time * 0.06, vec3(0.45, 0.47, 0.45), vec3(0.50, 0.34, 0.32), vec3(0.91, 1.11, 1.07), vec3(0.03, 0.55, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
