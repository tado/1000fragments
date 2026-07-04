uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.93;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.08 * vec2(sin(q.y * 3.78 + time * 0.84), cos(q.x * 3.71 - time * 1.48));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.35 + time * 0.80)) * (0.0054 / (abs(sin(q.x * 4.23) + sin(q.y * 5.43)) + 0.08));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
