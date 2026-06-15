uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.34, t * 2.23 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.10 + sr * 20.18 - t * 4.25 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	p += vec2(-0.16, -0.80) * sin(length(p) * 2.21 - time * 1.04) * 0.28;
	p = rot2(0.89) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 1.78 * p.y + time * 1.98); p.y += 0.31 / wf * cos(wf * 1.59 * p.x + time * 1.66); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.62);
	float d = d1 + d2;
	vec3 col = palette(d * 1.40 + time * 0.17, vec3(0.59, 0.42, 0.44), vec3(0.38, 0.37, 0.39), vec3(1.22, 0.71, 1.37), vec3(0.23, 0.64, 0.19));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
