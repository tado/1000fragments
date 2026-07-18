uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x = abs(p.x) - 0.31;
	p *= 1.06;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.66 + 0.28 * sin((time * 0.83) * 1.30);
	float n2 = 1.18 + 0.30 * cos((time * 0.83) * 0.96);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.84;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.03, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.25 + sr * 1.03), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.022, 0.091, 0.110), vec3(0.136, 0.583, 0.475), smoothstep(0.0, 0.54, cc)), vec3(0.978, 0.937, 0.884), smoothstep(0.54, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.92;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.60));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.989, 1.009, 1.002);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
