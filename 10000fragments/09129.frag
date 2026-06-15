uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.34, t * 1.00 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.74, t * 2.00 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.57 * p.y + time * 1.75); p.y += 0.30 / wf * cos(wf * 1.76 * p.x + time * 1.31); }
	p = rot2(length(p) * 2.93 + time * 1.05) * p;
	p *= 1.64;
	p = rot2(time * 0.46) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.51);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.02 + time * 0.16, vec3(0.45, 0.46, 0.48), vec3(0.32, 0.31, 0.41), vec3(1.05, 1.16, 0.78), vec3(0.48, 0.11, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
