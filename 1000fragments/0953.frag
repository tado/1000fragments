uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	p = rot2(time * 0.96) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.21 + 0.63 * sin(time * 1.75);
	float n2 = 0.72 + 0.93 * cos(time * 0.66);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.50;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	float cc = clamp(0.5 + 0.5 * v * 1.98 + sr * 1.63, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.06, 0.10), vec3(0.79, 0.68, 0.62), cc);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.83;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.08 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
