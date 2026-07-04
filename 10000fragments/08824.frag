uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.05 * vec2(sin(q.y * 3.65 + time * 1.82), cos(q.x * 3.98 - time * 2.27));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.88 + time * 0.75)) * (0.0089 / (abs(sin(q.x * 4.73) + sin(q.y * 5.57)) + 0.06));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
