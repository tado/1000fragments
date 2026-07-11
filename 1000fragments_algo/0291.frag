uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	p = p.yx;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.07 * vec2(sin(q.y * 2.16 + (time * 0.56) * 1.31), cos(q.x * 2.44 - (time * 0.56) * 2.16));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.04, 2.09) + float(si) * 0.56 + (time * 0.56) * 0.37)) * (0.0084 / (abs(sin(q.x * 5.52) + sin(q.y * 5.42)) + 0.13));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.009, 1.011, 0.992) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
