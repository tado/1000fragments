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
    float petal = 0.68 + 0.20 * cos(sa * 6 + t * 2.48 + ph);
    v = sin((sr - petal) * 7.69);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.51 + t * 1.29 + ph) + sin(p.y * 9.28 - t * 3.08 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(1.31) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.37 * p.y + time * 1.01); p.y += 0.27 / wf * cos(wf * 3.35 * p.x + time * 1.62); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.49) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.86);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.54 + time * 0.07, vec3(0.55, 0.53, 0.51), vec3(0.46, 0.37, 0.47), vec3(1.01, 0.84, 0.78), vec3(0.70, 0.76, 0.93));
	col = clamp((col - 0.5) * 1.21 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
