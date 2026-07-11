uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.07 * vec2(sin(q.y * 3.85 + time * 2.38), cos(q.x * 2.32 - time * 0.79));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.94 + time * 0.95)) * (0.0069 / (abs(sin(q.x * 3.67) + sin(q.y * 3.42)) + 0.06));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
