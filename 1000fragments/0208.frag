uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	p = rot2(time * -0.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.61 + 0.34 * sin(time * 1.39);
	float n2 = 1.57 + 0.42 * cos(time * 1.72);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.45;
	float d = sr - rr;
	float v = sin(d * 24.97 - time * 1.48);
	vec3 col = palette(v * 1.47 + time * 0.28, vec3(0.55, 0.54, 0.51), vec3(0.39, 0.32, 0.34), vec3(1.36, 1.22, 0.86), vec3(0.88, 0.27, 0.00));
	col = fract(col * 2.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
