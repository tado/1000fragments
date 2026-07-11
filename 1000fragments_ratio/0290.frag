uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x) - 0.49;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.07 * vec2(sin(q.y * 2.96 + (time * 0.75) * 1.76), cos(q.x * 3.73 - (time * 0.75) * 2.32));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.39, 2.78) + float(si) * 1.14 + (time * 0.75) * 0.94)) * (0.0089 / (abs(sin(q.x * 2.04) + sin(q.y * 2.58)) + 0.10));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.65 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(0.914, 0.996, 1.060) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
