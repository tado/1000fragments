uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.20;
	p.x *= resolution.x / resolution.y;
	p *= 1.23;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.10 * vec2(sin(q.y * 2.65 + (time * 0.54) * 2.29), cos(q.x * 3.50 - (time * 0.54) * 2.01));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.62, 1.24) + float(si) * 1.15 + (time * 0.54) * 0.91)) * (0.0064 / (abs(sin(q.x * 4.54) + sin(q.y * 5.36)) + 0.11));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.989, 0.999, 1.011) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
