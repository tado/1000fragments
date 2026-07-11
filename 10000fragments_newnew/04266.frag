uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.07 * vec2(sin(q.y * 3.37 + time * 2.44), cos(q.x * 2.06 - time * 1.66));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.33 + time * 0.78)) * (0.0091 / (abs(sin(q.x * 5.69) + sin(q.y * 3.00)) + 0.13));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 2.09 + time * 14.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
