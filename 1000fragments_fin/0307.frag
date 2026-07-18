uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.10;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.04 * vec2(sin(q.y * 3.06 + (time * 0.75) * 1.44), cos(q.x * 2.01 - (time * 0.75) * 1.31));
		col += (0.5 + 0.5 * cos(vec3(2.868, 3.573, 4.279) + float(si) * 1.16 + (time * 0.75) * 0.58)) * (0.0075 / (abs(sin(q.x * 5.33) + sin(q.y * 2.14)) + 0.11));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.025, 0.973, 1.016);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
