uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 1.25 + (time * 0.82) * 1.01) * 0.06;
	p.x = abs(p.x) - 0.49;
	p *= 1.35;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.54 + 0.71 * sin((time * 0.82) * 0.97);
	float n2 = 1.98 + 0.42 * cos((time * 0.82) * 1.77);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.62;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.05, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.53 + sr * 1.65), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.055, 0.052, 0.111), vec3(0.447, 0.185, 0.626), smoothstep(0.0, 0.57, cc)), vec3(1.000, 0.691, 0.845), smoothstep(0.57, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.63;
	col = clamp((col - 0.5) * 1.28 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.022, 0.997, 0.953);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
