uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	p *= 1.34;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.04 * vec2(sin(q.y * 2.47 + (time * 0.81) * 1.71), cos(q.x * 3.29 - (time * 0.81) * 2.36));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.95, 1.90) + float(si) * 1.15 + (time * 0.81) * 0.26)) * (0.0050 / (abs(sin(q.x * 5.08) + sin(q.y * 4.61)) + 0.11));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.01 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.956, 1.013, 0.938) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
