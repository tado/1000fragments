uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.41;
	p *= 1.40;
	p = rot2((time * 0.80) * -0.64) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.49 + 0.29 * sin((time * 0.80) * 0.71);
	float n2 = 1.66 + 0.50 * cos((time * 0.80) * 1.24);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.64;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	float cc = clamp(0.5 + 0.5 * (v * 2.24 + sr * 1.00), 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.10, 0.11), vec3(0.57, 0.48, 0.66), cc);
	col *= 1.0 - smoothstep(0.0, 0.10, d) * 0.90;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.034, 0.998, 0.928) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
