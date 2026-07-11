uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.04 + sin(p.y * 5.55 + t * 4.20) * 2.99 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.28 * cos(sa * 7 + t * 0.93 + ph);
    v = sin((sr - petal) * 6.73);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	p = rot2(time * -0.34) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.49 * p.y + time * 0.98); p.y += 0.35 / wf * cos(wf * 2.82 * p.x + time * 0.99); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.08, lr * 2.66 + time * -0.79); }
	p = rot2(length(p) * -2.04 + time * 0.20) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.98);
	float d = d1 + d2;
	vec3 col = palette(d * 1.34 + time * 0.12, vec3(0.46, 0.57, 0.53), vec3(0.38, 0.40, 0.46), vec3(1.21, 1.36, 1.16), vec3(0.30, 0.73, 0.24));
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
