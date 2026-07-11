uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.04 * vec2(sin(q.y * 3.87 + time * 1.05), cos(q.x * 2.93 - time * 2.19));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.90 + time * 0.49)) * (0.0083 / (abs(sin(q.x * 4.02) + sin(q.y * 3.07)) + 0.14));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
