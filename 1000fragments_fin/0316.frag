uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 2.72;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.10 * vec2(sin(q.y * 3.26 + (time * 0.79) * 2.16), cos(q.x * 1.53 - (time * 0.79) * 1.62));
		col += (0.5 + 0.5 * cos(vec3(0.494, 2.340, 4.185) + float(si) * 0.56 + (time * 0.79) * 0.56)) * (0.0099 / (abs(sin(q.x * 5.56) + sin(q.y * 4.28)) + 0.10));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.14 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.942, 0.989, 1.038);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
