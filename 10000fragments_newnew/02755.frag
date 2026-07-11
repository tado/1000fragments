uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	p = rot2(time * 0.69) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.49 + 0.64 * sin(time * 1.76);
	float n2 = 1.45 + 0.99 * cos(time * 0.59);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.89;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	float cc = clamp(0.5 + 0.5 * v * 1.55 + sr * 1.75, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.15, 0.30), vec3(0.89, 0.87, 0.55), cc);
	col *= 1.0 - smoothstep(0.0, 0.14, d) * 0.93;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.23 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
