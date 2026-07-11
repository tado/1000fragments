uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.37 + sin(p.y * 1.71 + t * 5.23) * 3.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -2.42 + time * 0.87) * p;
	p = rot2(time * -0.84) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.20, lr * 2.21 + time * 0.43); }
	{ p = vec2(atan(p.y, p.x) * 2.51, length(p) * 5.26 - time * 0.69); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.05, vec3(0.46, 0.43, 0.47), vec3(0.36, 0.39, 0.48), vec3(1.01, 1.15, 1.18), vec3(0.69, 0.18, 0.56));
	col = mod(col * 2.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
