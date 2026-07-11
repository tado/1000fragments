uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.79, t * 1.49 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.30 + t * 1.05 + ph) + sin(p.y * 9.70 - t * 1.05 + ph)
        + sin((p.x + p.y) * 9.99 + t * 1.05 + ph) + sin(length(p) * 5.98 - t * 1.05 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.57 * p.y + time * 0.95); p.y += 0.37 / wf * cos(wf * 1.64 * p.x + time * 1.69); }
	p = rot2(1.00) * p;
	p += vec2(0.08, 1.00) * sin(length(p) * 4.94 - time * 1.89) * 0.26;
	p = rot2(length(p) * -2.66 + time * 0.46) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.25);
	float d = d1 * d2;
	vec3 col = palette(d * 0.99 + time * 0.10, vec3(0.47, 0.49, 0.54), vec3(0.44, 0.42, 0.37), vec3(0.96, 0.77, 0.73), vec3(0.06, 0.40, 0.31));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
