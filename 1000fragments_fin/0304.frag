uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.56 + (time * 0.77) * 1.29) * 0.12;
	p *= 2.35;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 14; si++){
		q += 0.06 * vec2(sin(q.y * 2.51 + (time * 0.77) * 1.72), cos(q.x * 1.77 - (time * 0.77) * 1.48));
		col += (0.5 + 0.5 * cos(vec3(4.686, 5.415, 6.143) + float(si) * 0.74 + (time * 0.77) * 0.43)) * (0.0048 / (abs(sin(q.x * 3.95) + sin(q.y * 5.33)) + 0.11));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.020, 0.985, 0.961);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
