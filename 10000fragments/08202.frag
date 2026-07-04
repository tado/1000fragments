uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.06 * vec2(sin(q.y * 1.61 + time * 2.19), cos(q.x * 3.53 - time * 1.17));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.86 + time * 0.29)) * (0.0036 / (abs(sin(q.x * 4.77) + sin(q.y * 3.73)) + 0.06));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
