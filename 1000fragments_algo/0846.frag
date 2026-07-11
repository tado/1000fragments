uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	p.y = abs(p.y);
	p *= 0.94;
	p = rot2((time * 0.83) * 0.85) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.61 + 0.43 * sin((time * 0.83) * 1.43);
	float n2 = 2.48 + 0.92 * cos((time * 0.83) * 1.80);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.57;
	float d = sr - rr;
	float v = sin(d * 11.13 - (time * 0.83) * 1.55);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.68, 0.62, 0.56), vec3(0.08, 0.09, 0.03), cc);
	col *= 0.83 + 0.20 * sin(gl_FragCoord.y * 2.53 + (time * 0.83) * 6.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.932, 0.983, 1.045) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
