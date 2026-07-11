uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.06 * vec2(sin(q.y * 3.83 + time * 1.22), cos(q.x * 3.75 - time * 1.04));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.60 + time * 0.26)) * (0.0059 / (abs(sin(q.x * 4.67) + sin(q.y * 2.15)) + 0.10));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
