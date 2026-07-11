uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p += vec2(sin((time * 0.53) * 0.52), cos((time * 0.53) * 0.82)) * 0.10;
	p *= 1.40;
	p = rot2((time * 0.53) * 1.10) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.30 + 0.80 * sin((time * 0.53) * 1.76);
	float n2 = 1.46 + 0.64 * cos((time * 0.53) * 0.76);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.77;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.78 + sr * 1.46), 0.0, 1.0);
	vec3 col = mix(vec3(0.69, 0.68, 0.76), vec3(0.02, 0.06, 0.06), cc);
	col *= 1.0 - smoothstep(0.0, 0.11, d) * 0.76;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(0.927, 0.979, 1.024) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
