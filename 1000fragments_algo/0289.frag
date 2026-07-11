uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.07 * vec2(sin(q.y * 3.28 + (time * 0.63) * 1.15), cos(q.x * 2.38 - (time * 0.63) * 0.56));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.96, 1.92) + float(si) * 0.98 + (time * 0.63) * 0.37)) * (0.0038 / (abs(sin(q.x * 3.50) + sin(q.y * 2.79)) + 0.07));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.925, 0.964, 1.059) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
