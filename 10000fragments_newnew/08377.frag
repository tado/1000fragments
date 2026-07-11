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
	p = rot2(time * -0.40) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.77 + 0.68 * sin(time * 1.11);
	float n2 = 1.21 + 0.59 * cos(time * 1.10);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.63;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.69 + time * 0.16, vec3(0.40, 0.50, 0.59), vec3(0.50, 0.33, 0.38), vec3(0.80, 1.34, 0.98), vec3(1.00, 0.55, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
