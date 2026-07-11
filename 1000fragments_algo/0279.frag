uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.55;
	p *= 1.07;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.08 * vec2(sin(q.y * 2.88 + (time * 0.82) * 2.05), cos(q.x * 2.54 - (time * 0.82) * 2.16));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.81, 1.62) + float(si) * 0.80 + (time * 0.82) * 0.93)) * (0.0065 / (abs(sin(q.x * 5.98) + sin(q.y * 5.69)) + 0.14));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.911, 0.969, 1.055) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
