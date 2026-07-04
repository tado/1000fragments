uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	p = rot2(time * -0.48) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.61 + 0.30 * sin(time * 1.60);
	float n2 = 1.88 + 0.82 * cos(time * 0.66);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.41;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.15, d);

	float cc = clamp(0.5 + 0.5 * v * 2.00 + sr * 1.39, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.04, 0.27), vec3(0.75, 0.91, 0.49), cc);
	col *= 1.0 - smoothstep(0.0, 0.15, d) * 0.77;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
