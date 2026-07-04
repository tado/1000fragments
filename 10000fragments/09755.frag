uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.80;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.07 * vec2(sin(q.y * 2.57 + time * 0.88), cos(q.x * 3.79 - time * 2.05));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.56 + time * 0.40)) * (0.0073 / (abs(sin(q.x * 5.51) + sin(q.y * 3.75)) + 0.06));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
