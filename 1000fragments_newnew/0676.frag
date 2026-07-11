uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.04 * vec2(sin(q.y * 3.63 + (time * 0.72) * 1.46), cos(q.x * 2.81 - (time * 0.72) * 0.81));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.59, 1.17) + float(si) * 0.98 + (time * 0.72) * 0.93)) * (0.0077 / (abs(sin(q.x * 3.66) + sin(q.y * 3.77)) + 0.15));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.16 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.993, 0.998, 0.996) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
