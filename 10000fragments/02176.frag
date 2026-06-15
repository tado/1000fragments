uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.32 + 0.26 * cos(sa * 9 + t * 1.29 + ph);
    v = sin((sr - petal) * 11.72);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.13 * cos(sa * 6 + t * 0.92 + ph);
    v = sin((sr - petal) * 18.57);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 1.63 * p.y + time * 1.01); p.y += 0.45 / wf * cos(wf * 3.69 * p.x + time * 1.68); }
	p = rot2(p.y * 2.78 + time * 0.69) * p;
	p = rot2(1.34) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.50 + time * 0.15, vec3(0.44, 0.56, 0.51), vec3(0.36, 0.48, 0.32), vec3(1.22, 1.14, 1.26), vec3(0.11, 0.48, 0.10));
	col = clamp((col - 0.5) * 1.40 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
