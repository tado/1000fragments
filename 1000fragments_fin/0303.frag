uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.05 * vec2(sin(q.y * 2.22 + (time * 0.73) * 1.54), cos(q.x * 2.11 - (time * 0.73) * 1.82));
		col += (0.5 + 0.5 * cos(vec3(4.250, 5.341, 6.433) + float(si) * 0.34 + (time * 0.73) * 0.55)) * (0.0061 / (abs(sin(q.x * 2.80) + sin(q.y * 3.76)) + 0.07));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.998, 1.000, 0.988);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
