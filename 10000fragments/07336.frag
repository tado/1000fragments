uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.14, t * 1.28 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.42 * p.y + time * 1.14); p.y += 0.39 / wf * cos(wf * 3.47 * p.x + time * 0.72); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.28, lr * 2.93 + time * 0.72); }
	p = rot2(2.42) * p;
	{ p = vec2(atan(p.y, p.x) * 2.59, length(p) * 3.22 - time * 0.48); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.03, vec3(0.50, 0.44, 0.40), vec3(0.31, 0.41, 0.30), vec3(0.71, 1.13, 1.09), vec3(0.43, 0.39, 0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
