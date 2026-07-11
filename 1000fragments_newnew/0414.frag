uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 9; si++){
		q += 0.07 * vec2(sin(q.y * 3.10 + (time * 0.51) * 0.62), cos(q.x * 2.83 - (time * 0.51) * 1.42));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.03) + float(si) * 0.95 + (time * 0.51) * 0.81)) * (0.0094 / (abs(sin(q.x * 5.46) + sin(q.y * 4.23)) + 0.08));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 1.22 + (time * 0.51) * 4.06);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.970, 1.012, 0.931) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
