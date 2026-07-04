uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p = rot2(time * -0.85) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.13 + 0.68 * sin(time * 1.03);
	float n2 = 2.48 + 0.64 * cos(time * 0.98);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.55;
	float d = sr - rr;
	float v = sin(d * 26.49 - time * 2.71);
	vec3 col = palette(v * 0.89 + time * 0.09, vec3(0.48, 0.46, 0.55), vec3(0.38, 0.32, 0.34), vec3(0.80, 0.84, 0.82), vec3(0.30, 0.71, 0.35));
	col = mod(col * 2.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
