uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	p = rot2(time * -0.32) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 0.73 + 0.54 * sin(time * 1.22);
	float n2 = 1.57 + 0.50 * cos(time * 0.52);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.52;
	float d = sr - rr;
	float v = sin(d * 23.48 - time * 2.49);
	vec3 col = palette(v * 0.71 + time * 0.18, vec3(0.49, 0.40, 0.49), vec3(0.34, 0.45, 0.44), vec3(0.88, 1.34, 1.35), vec3(0.06, 0.35, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
