uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.11;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.08 * vec2(sin(q.y * 2.13 + time * 2.32), cos(q.x * 3.49 - time * 1.51));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.58 + time * 0.87)) * (0.0076 / (abs(sin(q.x * 4.04) + sin(q.y * 2.22)) + 0.06));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.47 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
