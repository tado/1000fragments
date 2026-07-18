uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 1.41;
	p = rot2((time * 0.79) * 1.13) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.93 + 0.58 * sin((time * 0.79) * 1.54);
	float n2 = 1.08 + 0.55 * cos((time * 0.79) * 1.37);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.61;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.02, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.09 + sr * 1.06), 0.0, 1.0);
	vec3 col = mix(vec3(0.757, 0.745, 0.960), vec3(0.048, 0.035, 0.102), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.13, d) * 0.70;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.026, 0.948, 1.014);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
