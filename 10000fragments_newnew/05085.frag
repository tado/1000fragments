uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.05 * vec2(sin(q.y * 2.84 + time * 1.78), cos(q.x * 2.91 - time * 0.97));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.54 + time * 0.82)) * (0.0098 / (abs(sin(q.x * 3.17) + sin(q.y * 2.02)) + 0.10));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
