uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.30;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.06 * vec2(sin(q.y * 2.92 + time * 0.56), cos(q.x * 2.01 - time * 1.08));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * 0.53 + time * 0.37)) * (0.0072 / (abs(sin(q.x * 2.21) + sin(q.y * 5.70)) + 0.13));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
