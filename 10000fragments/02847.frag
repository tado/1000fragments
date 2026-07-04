uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p = rot2(time * 1.43) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.93 + 0.10 * sin(time * 1.22);
	float n2 = 1.26 + 0.89 * cos(time * 1.78);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.77;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	float cc = clamp(0.5 + 0.5 * v * 1.33 + sr * 1.86, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.02, 0.18), vec3(0.97, 0.59, 0.60), cc);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.63;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
