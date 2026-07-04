uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.07 * vec2(sin(q.y * 3.20 + time * 2.14), cos(q.x * 2.37 - time * 2.44));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.90 + time * 0.92)) * (0.0039 / (abs(sin(q.x * 3.54) + sin(q.y * 3.90)) + 0.08));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
