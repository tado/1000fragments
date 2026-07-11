uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	p = rot2((time * 0.54) * 1.39) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.04 + 0.66 * sin((time * 0.54) * 1.98);
	float n2 = 1.59 + 0.35 * cos((time * 0.54) * 0.44);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.46;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.56 + sr * 1.46), 0.0, 1.0);
	vec3 col = mix(vec3(0.80, 0.84, 0.78), vec3(0.06, 0.10, 0.08), cc);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.79;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.018, 0.948, 1.009) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
