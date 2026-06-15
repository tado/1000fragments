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
    v = sin(sa * 5.24 + sr * 12.81 - t * 3.40 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.71 + t * 1.79 + ph) + sin(p.y * 16.72 - t * 0.84 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p = rot2(time * -0.67) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 1.73 * p.y + time * 1.66); p.y += 0.20 / wf * cos(wf * 1.81 * p.x + time * 1.34); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + 0.20 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.98);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.55 + time * 0.25, vec3(0.51, 0.60, 0.45), vec3(0.35, 0.45, 0.32), vec3(0.88, 1.38, 1.02), vec3(0.86, 0.79, 0.71));
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
