uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.63;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.04 * vec2(sin(q.y * 2.16 + time * 2.38), cos(q.x * 2.05 - time * 1.23));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.37 + time * 1.00)) * (0.0066 / (abs(sin(q.x * 2.46) + sin(q.y * 5.72)) + 0.07));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
