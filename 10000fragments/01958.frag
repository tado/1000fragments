uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.36;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.09 * vec2(sin(q.y * 3.71 + time * 2.22), cos(q.x * 2.74 - time * 0.55));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.32 + time * 0.65)) * (0.0084 / (abs(sin(q.x * 3.79) + sin(q.y * 5.25)) + 0.13));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 2.45 + time * 10.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
