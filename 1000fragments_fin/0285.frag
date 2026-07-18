uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.75;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.10 * vec2(sin(q.y * 2.34 + (time * 0.61) * 1.78), cos(q.x * 1.91 - (time * 0.61) * 1.41));
		col += (0.5 + 0.5 * cos(vec3(2.119, 3.967, 5.815) + float(si) * 0.61 + (time * 0.61) * 0.98)) * (0.0098 / (abs(sin(q.x * 4.92) + sin(q.y * 3.89)) + 0.07));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.96));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.003, 0.951, 0.997);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
