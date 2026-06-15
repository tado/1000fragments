uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.66 + t * 2.31 + ph) + sin(p.y * 4.62 - t * 2.31 + ph)
        + sin((p.x + p.y) * 6.43 + t * 2.31 + ph) + sin(length(p) * 16.07 - t * 2.31 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	p = rot2(0.33) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.19, lr * 2.61 + time * 0.29); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.87 * p.y + time * 1.77); p.y += 0.50 / wf * cos(wf * 1.64 * p.x + time * 1.65); }
	{ float fr = length(p); p *= 1.0 + 0.56 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.81 + time * 0.11, vec3(0.44, 0.47, 0.50), vec3(0.44, 0.34, 0.44), vec3(1.31, 0.82, 1.07), vec3(0.98, 0.36, 0.68));
	col = mod(col * 1.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
