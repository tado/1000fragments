uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.55 + sin(p.y * 5.66 + t * 2.57) * 4.32 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.14 * cos(sa * 4 + t * 2.16 + ph);
    v = sin((sr - petal) * 8.17);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.10;
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * 0.76) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.95 * p.y + time * 1.61); p.y += 0.25 / wf * cos(wf * 1.50 * p.x + time * 1.00); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.07);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.14 + time * 0.02, vec3(0.58, 0.49, 0.45), vec3(0.39, 0.36, 0.48), vec3(1.19, 0.75, 1.37), vec3(0.89, 0.18, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
