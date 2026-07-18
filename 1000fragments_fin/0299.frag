uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.05 * vec2(sin(q.y * 3.62 + (time * 0.64) * 1.08), cos(q.x * 2.50 - (time * 0.64) * 0.59));
		col += (0.5 + 0.5 * cos(vec3(2.735, 3.488, 4.242) + float(si) * 1.16 + (time * 0.64) * 0.30)) * (0.0031 / (abs(sin(q.x * 2.90) + sin(q.y * 4.07)) + 0.10));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 1.84 + (time * 0.64) * 10.01);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(0.927, 0.975, 1.039);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
