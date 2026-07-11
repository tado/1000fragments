uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.76) * 0.31), cos((time * 0.76) * 1.15)) * 0.15;
	p *= 1.84;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 15; si++){
		q += 0.06 * vec2(sin(q.y * 2.71 + (time * 0.76) * 2.42), cos(q.x * 3.85 - (time * 0.76) * 1.28));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.90, 1.80) + float(si) * 0.52 + (time * 0.76) * 0.99)) * (0.0085 / (abs(sin(q.x * 2.69) + sin(q.y * 2.20)) + 0.12));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.050, 0.970, 0.929) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
