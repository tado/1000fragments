uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	p = rot2(time * 1.27) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.99 + 0.28 * sin(time * 1.55);
	float n2 = 1.07 + 0.51 * cos(time * 1.80);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.55;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.11, d);

	vec3 col = palette(v * 1.64 + sr * 1.85 * 0.62 + time * 0.03, vec3(0.51, 0.40, 0.60), vec3(0.47, 0.45, 0.48), vec3(0.88, 0.86, 0.92), vec3(0.80, 0.75, 0.05));
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
