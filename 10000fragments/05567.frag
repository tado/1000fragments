uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p = rot2(time * 0.70) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.54 + 0.27 * sin(time * 0.65);
	float n2 = 1.06 + 0.26 * cos(time * 1.41);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.44;
	float d = sr - rr;
	float v = sin(d * 20.40 - time * 2.60);
	vec3 col = palette(v * 1.24 + time * 0.39, vec3(0.51, 0.60, 0.47), vec3(0.34, 0.40, 0.42), vec3(1.04, 0.80, 0.90), vec3(0.79, 0.27, 0.23));
	col *= 0.84 + 0.19 * sin(gl_FragCoord.y * 2.15 + time * 16.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
