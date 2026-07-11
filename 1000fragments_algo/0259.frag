uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.41 + (time * 0.56) * 0.77) * 0.17;
	p.x *= resolution.x / resolution.y;
	p *= 1.85;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.07 * vec2(sin(q.y * 3.26 + (time * 0.56) * 1.77), cos(q.x * 3.49 - (time * 0.56) * 2.23));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.69, 1.38) + float(si) * 1.08 + (time * 0.56) * 0.22)) * (0.0070 / (abs(sin(q.x * 2.63) + sin(q.y * 3.16)) + 0.11));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.974, 0.991, 0.957) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
