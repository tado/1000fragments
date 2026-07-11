uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.52;
	p *= 0.90;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.39 + 0.78 * sin((time * 0.76) * 1.11);
	float n2 = 1.52 + 0.55 * cos((time * 0.76) * 1.60);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.64;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = vec3(0.80, 0.75, 0.75) * (0.06 / (abs((v * 1.87 + sr * 1.82)) + 0.10));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.11, d) * 0.63;
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 1.63 + (time * 0.76) * 13.60);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 0.953, 0.997) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
