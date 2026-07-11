uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.57 + (time * 0.62) * 0.58) * 0.16;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.05 * vec2(sin(q.y * 1.84 + (time * 0.62) * 2.38), cos(q.x * 1.65 - (time * 0.62) * 2.13));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.82, 1.63) + float(si) * 0.46 + (time * 0.62) * 0.31)) * (0.0072 / (abs(sin(q.x * 3.18) + sin(q.y * 3.14)) + 0.05));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col = clamp(col, 0.0, 1.0) * vec3(0.973, 1.012, 0.933) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
