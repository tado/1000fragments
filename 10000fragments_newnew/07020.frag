uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p = rot2(time * 0.85) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.69 + 0.45 * sin(time * 1.18);
	float n2 = 1.32 + 0.63 * cos(time * 0.55);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.48;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = palette(v * 2.28 + sr * 0.63 * 0.54 + time * 0.25, vec3(0.56, 0.49, 0.49), vec3(0.44, 0.40, 0.33), vec3(1.07, 1.30, 0.71), vec3(0.80, 0.28, 0.94));
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.69;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
