uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.09 * vec2(sin(q.y * 3.84 + time * 1.37), cos(q.x * 1.78 - time * 2.46));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.55 + time * 0.63)) * (0.0093 / (abs(sin(q.x * 3.33) + sin(q.y * 2.25)) + 0.10));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
