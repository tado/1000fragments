uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.32 + sin(p.y * 1.81 + t * 3.74) * 2.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.37 * p.y + time * 1.69); p.y += 0.38 / wf * cos(wf * 3.18 * p.x + time * 0.88); }
	p = rot2(p.y * -1.74 + time * 0.71) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.57, lr * 1.96 + time * -0.14); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.26, vec3(0.58, 0.43, 0.44), vec3(0.32, 0.34, 0.35), vec3(0.90, 0.98, 0.77), vec3(0.22, 0.25, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
