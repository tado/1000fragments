uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.08;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.10 * vec2(sin(q.y * 2.88 + time * 0.66), cos(q.x * 3.88 - time * 2.35));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 1.08 + time * 0.54)) * (0.0055 / (abs(sin(q.x * 3.63) + sin(q.y * 3.85)) + 0.06));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.12 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
