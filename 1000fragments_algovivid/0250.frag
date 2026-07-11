uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.56;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.04 * vec2(sin(q.y * 2.40 + (time * 0.54) * 2.08), cos(q.x * 2.60 - (time * 0.54) * 0.85));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.70, 3.39) + float(si) * 1.01 + (time * 0.54) * 0.44)) * (0.0091 / (abs(sin(q.x * 3.93) + sin(q.y * 5.94)) + 0.09));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.936, 0.981, 1.035) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
