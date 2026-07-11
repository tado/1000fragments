uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	p = rot2((time * 0.55) * 1.31) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.58 + 0.37 * sin((time * 0.55) * 1.14);
	float n2 = 1.28 + 0.58 * cos((time * 0.55) * 1.32);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.87;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.97 + sr * 1.09), 0.0, 1.0);
	vec3 col = mix(vec3(0.42, 0.19, 0.37), vec3(0.67, 0.54, 0.56), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.84;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.987, 1.014, 0.926) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
