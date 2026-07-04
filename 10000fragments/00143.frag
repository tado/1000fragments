uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.04 * vec2(sin(q.y * 2.71 + time * 1.81), cos(q.x * 1.76 - time * 0.76));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.83 + time * 0.37)) * (0.0042 / (abs(sin(q.x * 4.92) + sin(q.y * 2.78)) + 0.07));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
