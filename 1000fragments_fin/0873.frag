uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p = p.yx;
	p.x = abs(p.x) - 0.31;
	p *= 1.24;
	p = rot2((time * 0.71) * -1.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.15 + 0.43 * sin((time * 0.71) * 0.67);
	float n2 = 1.63 + 0.32 * cos((time * 0.71) * 0.81);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.66;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.80 + sr * 0.60), 0.0, 1.0);
	vec3 col = mix(vec3(0.920, 0.865, 0.807), vec3(0.234, 0.265, 0.468), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.77;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.980, 1.006, 0.958);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
