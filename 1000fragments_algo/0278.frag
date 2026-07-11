uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.00 + (time * 0.71) * 0.81) * 0.14;
	p.x *= resolution.x / resolution.y;
	p *= 1.50;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 13; si++){
		q += 0.07 * vec2(sin(q.y * 1.67 + (time * 0.71) * 1.28), cos(q.x * 3.90 - (time * 0.71) * 1.79));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.97, 1.95) + float(si) * 1.05 + (time * 0.71) * 0.57)) * (0.0088 / (abs(sin(q.x * 4.95) + sin(q.y * 3.42)) + 0.11));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 1.28 + (time * 0.71) * 5.87);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.987, 0.993, 0.953) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
