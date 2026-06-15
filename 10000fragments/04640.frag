uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.56, t * 1.54 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.31 + sin(p.y * 2.39 + t * 1.19) * 4.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.31, lr * 1.95 + time * 0.32); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.53 * p.y + time * 1.99); p.y += 0.25 / wf * cos(wf * 1.59 * p.x + time * 1.15); }
	p = rot2(2.50) * p;
	{ float fr = length(p); p *= 1.0 + -0.77 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.38);
	float d = d1 + d2;
	vec3 col = palette(d * 1.60 + time * 0.05, vec3(0.44, 0.54, 0.44), vec3(0.48, 0.37, 0.38), vec3(1.29, 1.31, 0.97), vec3(0.02, 0.07, 0.52));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
