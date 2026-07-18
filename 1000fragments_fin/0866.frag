uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.89 + 0.36 * sin((time * 0.84) * 1.78);
	float n2 = 2.42 + 0.62 * cos((time * 0.84) * 0.71);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.61;
	float d = sr - rr;
	float v = sin(d * 15.49 - (time * 0.84) * 4.19);
	vec3 col = vec3(0.653, 0.844, 1.000) * (0.06 / (abs((v)) + 0.06));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.987, 1.002, 0.943);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
