uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.35;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.09 * vec2(sin(q.y * 1.55 + time * 1.47), cos(q.x * 2.29 - time * 0.51));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.35 + time * 0.53)) * (0.0044 / (abs(sin(q.x * 4.16) + sin(q.y * 2.62)) + 0.09));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
