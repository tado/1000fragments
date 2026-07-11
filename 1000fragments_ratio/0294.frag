uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.35 + (time * 0.55) * 1.45) * 0.13;
	p.y = abs(p.y);
	p *= 1.77;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 8; si++){
		q += 0.08 * vec2(sin(q.y * 3.76 + (time * 0.55) * 1.92), cos(q.x * 2.50 - (time * 0.55) * 1.58));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.15, 2.30) + float(si) * 0.95 + (time * 0.55) * 0.89)) * (0.0083 / (abs(sin(q.x * 3.07) + sin(q.y * 3.70)) + 0.08));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.13));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col = clamp(col, 0.0, 1.0) * vec3(0.913, 0.960, 1.036) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
