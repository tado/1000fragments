uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.09 * vec2(sin(q.y * 1.61 + time * 1.36), cos(q.x * 3.84 - time * 2.26));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.88 + time * 0.54)) * (0.0057 / (abs(sin(q.x * 3.54) + sin(q.y * 5.07)) + 0.14));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
