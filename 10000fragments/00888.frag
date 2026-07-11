uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.75 + sin(p.y * 3.67 + t * 5.81) * 3.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	p *= 2.29;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.03, lr * 1.25 + time * -0.64); }
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	p = rot2(p.y * -2.92 + time * 0.35) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.27, vec3(0.46, 0.59, 0.50), vec3(0.45, 0.32, 0.31), vec3(1.20, 1.01, 1.12), vec3(0.71, 0.98, 0.45));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
