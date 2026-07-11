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
    v = sin(sa * 11.69 + sr * 5.34 - t * 4.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.96 * p.y + time * 0.91); p.y += 0.37 / wf * cos(wf * 2.68 * p.x + time * 0.76); }
	p = rot2(time * 1.18) * p;
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.96 + time * 0.03, vec3(0.53, 0.47, 0.45), vec3(0.40, 0.39, 0.39), vec3(1.21, 1.02, 1.12), vec3(0.49, 0.71, 0.55));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
