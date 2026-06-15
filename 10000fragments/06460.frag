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
    v = sin(sa * 8.49 + sr * 10.21 - t * 0.59 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.53;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * 1.87 + time * 1.20) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.51 * p.y + time * 0.83); p.y += 0.45 / wf * cos(wf * 2.83 * p.x + time * 0.97); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.29, lr * 1.55 + time * -0.35); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.21, vec3(0.51, 0.44, 0.49), vec3(0.33, 0.49, 0.37), vec3(0.94, 1.09, 0.98), vec3(0.22, 0.36, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
