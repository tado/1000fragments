uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.34 - t * 2.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -1.24 + time * 1.07) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.49 * p.y + time * 1.40); p.y += 0.50 / wf * cos(wf * 3.19 * p.x + time * 2.18); }
	p *= 2.48;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.26, vec3(0.46, 0.59, 0.58), vec3(0.46, 0.41, 0.45), vec3(0.99, 1.29, 1.08), vec3(0.44, 0.30, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
