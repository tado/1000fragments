uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	p = rot2(time * -0.71) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.78 + 0.61 * sin(time * 2.00);
	float n2 = 1.54 + 0.91 * cos(time * 0.41);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.78;
	float d = sr - rr;
	float v = sin(d * 12.43 - time * 4.49);
	vec3 col = palette(v * 0.91 + time * 0.25, vec3(0.55, 0.47, 0.42), vec3(0.32, 0.37, 0.32), vec3(0.74, 1.35, 0.76), vec3(0.30, 0.59, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
