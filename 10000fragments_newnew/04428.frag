uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	p = rot2(time * 0.32) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.86 + 0.68 * sin(time * 1.89);
	float n2 = 1.31 + 0.48 * cos(time * 1.18);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.80;
	float d = sr - rr;
	float v = sin(d * 29.73 - time * 5.00);
	vec3 col = palette(v * 1.39 + time * 0.06, vec3(0.55, 0.49, 0.49), vec3(0.35, 0.30, 0.48), vec3(1.06, 0.88, 0.94), vec3(0.76, 0.98, 0.39));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
