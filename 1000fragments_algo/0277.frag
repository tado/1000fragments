uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 11; si++){
		q += 0.05 * vec2(sin(q.y * 3.29 + (time * 0.52) * 0.96), cos(q.x * 3.53 - (time * 0.52) * 1.30));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.79, 1.58) + float(si) * 1.09 + (time * 0.52) * 0.33)) * (0.0079 / (abs(sin(q.x * 4.70) + sin(q.y * 4.44)) + 0.10));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.934, 0.970, 1.043) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
