uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.16 + (time * 0.52) * 0.43) * 0.09;
	p *= 1.39;
	p = rot2((time * 0.52) * -1.36) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.59 + 0.18 * sin((time * 0.52) * 0.65);
	float n2 = 1.44 + 0.31 * cos((time * 0.52) * 1.73);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.62;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	float cc = clamp(0.5 + 0.5 * (v * 2.46 + sr * 0.89), 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.08, 0.13), vec3(0.69, 0.71, 0.67), cc);
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.68;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.70));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(0.944, 0.972, 1.037) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
