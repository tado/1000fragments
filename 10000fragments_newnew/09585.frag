uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.05 * vec2(sin(q.y * 3.08 + time * 2.20), cos(q.x * 3.55 - time * 0.57));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.80 + time * 0.94)) * (0.0036 / (abs(sin(q.x * 5.40) + sin(q.y * 3.40)) + 0.13));
	}
	col = col / (1.0 + col);
	col *= 0.90 + 0.14 * sin(gl_FragCoord.y * 2.69 + time * 11.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
