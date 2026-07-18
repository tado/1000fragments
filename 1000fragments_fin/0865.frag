uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.38 + (time * 0.89) * 0.85) * 0.17;
	p = p.yx;
	p *= 1.16;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.84 + 0.49 * sin((time * 0.89) * 0.78);
	float n2 = 0.76 + 0.56 * cos((time * 0.89) * 1.00);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.60;
	float d = sr - rr;
	float v = sin(d * 15.68 - (time * 0.89) * 4.33);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.000, 0.097, 0.106), vec3(0.138, 0.597, 0.464), smoothstep(0.0, 0.45, cc)), vec3(0.960, 0.938, 0.882), smoothstep(0.45, 1.0, cc));
	col *= 0.90 + 0.20 * sin(gl_FragCoord.y * 1.83 + (time * 0.89) * 8.46);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.008, 0.983, 0.937);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
