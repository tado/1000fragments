uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.77 + t * 0.94 + ph) + sin(p.y * 9.93 - t * 5.53 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.23 * cos(sa * 5 + t * 0.47 + ph);
    v = sin((sr - petal) * 12.74);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.48, lr * 2.56 + time * -0.60); }
	p = rot2(p.y * -1.22 + time * 0.65) * p;
	{ p = vec2(atan(p.y, p.x) * 2.80, length(p) * 3.87 - time * 0.18); }
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.55 + time * 0.13, vec3(0.55, 0.56, 0.47), vec3(0.39, 0.43, 0.38), vec3(0.93, 1.34, 0.80), vec3(0.46, 0.85, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
