uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y);
	p = p.yx;
	p *= 2.10;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 12; si++){
		q += 0.04 * vec2(sin(q.y * 3.38 + (time * 0.62) * 2.37), cos(q.x * 3.88 - (time * 0.62) * 1.85));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.83, 1.66) + float(si) * 0.77 + (time * 0.62) * 0.73)) * (0.0069 / (abs(sin(q.x * 5.55) + sin(q.y * 2.78)) + 0.09));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 1.005, 1.000) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
