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
    v = sin(sa * 7.10 + sr * 17.03 - t * 2.32 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	p = rot2(length(p) * 3.42 + time * 0.34) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.24 * p.y + time * 0.91); p.y += 0.43 / wf * cos(wf * 1.96 * p.x + time * 0.88); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.24, vec3(0.54, 0.52, 0.45), vec3(0.50, 0.42, 0.38), vec3(1.34, 1.14, 1.01), vec3(0.80, 0.18, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
