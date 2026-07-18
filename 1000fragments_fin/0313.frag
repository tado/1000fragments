uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.08 * vec2(sin(q.y * 3.47 + (time * 0.64) * 2.34), cos(q.x * 2.43 - (time * 0.64) * 0.83));
		col += (0.5 + 0.5 * cos(vec3(2.840, 4.800, 6.759) + float(si) * 1.17 + (time * 0.64) * 0.81)) * (0.0092 / (abs(sin(q.x * 3.48) + sin(q.y * 4.26)) + 0.08));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.018, 0.955, 1.008);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
