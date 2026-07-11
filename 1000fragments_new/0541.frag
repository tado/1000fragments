uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	p = rot2(time * 0.31) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.18 + 0.11 * sin(time * 1.95);
	float n2 = 0.70 + 0.68 * cos(time * 0.69);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.46;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.02, d);

	float cc = clamp(0.5 + 0.5 * v * 1.47 + sr * 1.81, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.32, 0.03), vec3(0.94, 0.71, 0.42), cc);
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.62;
	col = fract(col * 2.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
