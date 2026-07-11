uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.33;
	p *= 1.49;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.08 * vec2(sin(q.y * 2.83 + (time * 0.71) * 1.34), cos(q.x * 1.52 - (time * 0.71) * 1.99));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.85, 1.70) + float(si) * 0.81 + (time * 0.71) * 0.90)) * (0.0096 / (abs(sin(q.x * 5.92) + sin(q.y * 5.08)) + 0.15));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(1.045, 0.971, 0.937) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
