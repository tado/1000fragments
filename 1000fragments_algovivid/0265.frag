uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.71;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.04 * vec2(sin(q.y * 3.85 + (time * 0.69) * 2.33), cos(q.x * 3.02 - (time * 0.69) * 1.80));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.42, 2.85) + float(si) * 1.05 + (time * 0.69) * 0.63)) * (0.0051 / (abs(sin(q.x * 4.69) + sin(q.y * 4.86)) + 0.11));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.938, 0.997, 1.024) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
