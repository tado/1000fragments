uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.36 + 0.41 * sin((time * 0.59) * 1.32);
	float n2 = 1.73 + 0.48 * cos((time * 0.59) * 1.62);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.62;
	float d = sr - rr;
	float v = sin(d * 23.89 - (time * 0.59) * 5.77);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.53, 0.54, 0.52) + vec3(0.05, 0.05, 0.03);
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 2.10 + (time * 0.59) * 10.98);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.931, 0.982, 1.031);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
