uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.25 + (time * 0.53) * 1.01) * 0.16;
	p *= 1.82;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.05 * vec2(sin(q.y * 2.64 + (time * 0.53) * 1.79), cos(q.x * 2.31 - (time * 0.53) * 0.55));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.66, 1.31) + float(si) * 0.79 + (time * 0.53) * 0.50)) * (0.0043 / (abs(sin(q.x * 3.79) + sin(q.y * 4.90)) + 0.12));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col = clamp(col, 0.0, 1.0) * vec3(1.015, 0.990, 0.981) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
