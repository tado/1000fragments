uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.62 + sin(p.y * 1.24 + t * 2.46) * 3.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.96;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.62 * p.y + time * 0.69); p.y += 0.30 / wf * cos(wf * 3.62 * p.x + time * 1.96); }
	p = abs(p) - 0.76;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.45, lr * 2.02 + time * 0.42); }
	p = rot2(0.95) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.20, vec3(0.52, 0.60, 0.40), vec3(0.37, 0.48, 0.46), vec3(1.26, 1.06, 0.99), vec3(0.76, 0.27, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
