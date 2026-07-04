uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	p = rot2(time * 0.60) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.93 + 0.21 * sin(time * 1.78);
	float n2 = 1.95 + 0.49 * cos(time * 1.47);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.59;
	float d = sr - rr;
	float v = sin(d * 27.47 - time * 3.93);
	vec3 col = palette(v * 1.02 + time * 0.11, vec3(0.53, 0.46, 0.50), vec3(0.43, 0.47, 0.49), vec3(1.15, 1.11, 0.79), vec3(0.84, 0.27, 0.19));
	col = fract(col * 2.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
