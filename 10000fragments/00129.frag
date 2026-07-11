uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.88 - t * 3.78 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.62 + t * 0.87 + ph) + sin(p.y * 16.88 - t * 0.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	{ float fr = length(p); p *= 1.0 + -0.76 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 2.82 + time * 0.38); }
	p = rot2(0.32) * p;
	p = rot2(p.y * 3.69 + time * 0.35) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.70 + time * 0.22, vec3(0.43, 0.56, 0.58), vec3(0.37, 0.36, 0.33), vec3(1.25, 0.96, 1.25), vec3(0.80, 0.26, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
