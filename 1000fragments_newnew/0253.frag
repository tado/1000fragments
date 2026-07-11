uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.07;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 10; si++){
		q += 0.06 * vec2(sin(q.y * 2.69 + (time * 0.55) * 2.04), cos(q.x * 3.67 - (time * 0.55) * 2.26));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.02) + float(si) * 0.34 + (time * 0.55) * 0.49)) * (0.0064 / (abs(sin(q.x * 2.73) + sin(q.y * 4.69)) + 0.12));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.944, 0.968, 1.035) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
