uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.06 + t * 1.17 + ph) + sin(p.y * 6.91 - t * 1.40 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.40 + t * 4.95 + ph) + sin(p.y * 9.93 - t * 0.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.79, lr * 2.42 + time * 0.44); }
	p = rot2(time * 1.14) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.56 * p.y + time * 1.81); p.y += 0.22 / wf * cos(wf * 3.13 * p.x + time * 1.61); }
	p = rot2(length(p) * 3.13 + time * 0.91) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.40);
	float d = d1 + d2;
	vec3 col = palette(d * 0.90 + time * 0.05, vec3(0.42, 0.44, 0.57), vec3(0.47, 0.30, 0.33), vec3(0.99, 1.02, 0.98), vec3(0.85, 0.60, 0.09));
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
